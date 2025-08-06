import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import saveAs from 'file-saver';
import { UserData, InactionTemplateData, LetterType } from '../types';

const nullGetter = (part: any) => {
    if (part.value === null || typeof part.value === 'undefined') {
        return "";
    }
    return `<${part.value}>`;
};

const getGermanDate = () => {
    return new Date().toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

const prepareData = (data: UserData & InactionTemplateData, letterType: LetterType) => {
    const isUntaetigkeitsklage = letterType === LetterType.Untaetigkeitsklage;
    
    const processedData: any = {
        NAME: data.name,
        SURNAME: data.surname,
        DOB: data.dob,
        STREET: data.street,
        POSTCODE: data.postcode,
        CITY: data.city,
        EMAIL: data.email,
        TODAY_DATE: getGermanDate(),
        ORAL_REFUSAL_DATE: data.oralRefusalDate || '',
        APPLICATION_DATE: data.applicationDate || '',
        LRA_LETTER_DATE: data.lraLetterDate || '',
        DEADLINE_DATE: data.deadlineDate || '',
    };
    
    if (isUntaetigkeitsklage) {
        processedData.AND_OR_FIKTION_BLOCK = data.alsoAppliedFiktion ? ' und auf Ausstellung einer Fiktionsbescheinigung nach § 81 Abs. 5 AufenthG' : '';
        processedData.AND_OR_FIKTION_ANTRAG_BLOCK = data.alsoAppliedFiktion ? ' bzw. Anträge' : '';
        processedData.BMV_BLOCK = data.alsoAppliedFiktion ? 'Ich weise darauf hin, dass mir ohne einen Aufenthaltstitel oder eine Fiktionsbescheinigung Leistungen nach dem AsylbLG verweigert werden, was eine Notsituation für mich darstellt.' : '';
        processedData.FRIST_BLOCK = data.alsoAppliedFiktion ? ' oder die Fiktionsbescheinigung ausgestellt wird' : '';
        processedData.ENQUIRY_LIST = data.previousEnquiries ? ' (mündlich/schriftlich am [ДАТА ЗАПРОСА])' : '';
    }

    return processedData;
}

const generateDocxBlob = async (letterType: LetterType, templateFile: string, data: UserData & InactionTemplateData): Promise<Blob> => {
    const templatePath = `/templates/${templateFile}`;
    const response = await fetch(templatePath);
    if (!response.ok) {
        throw new Error(`Не удалось загрузить шаблон: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    
    const doc = new Docxtemplater(zip, {
        delimiters: { start: '<', end: '>' },
        nullGetter,
        paragraphLoop: true,
        linebreaks: true,
    });
    
    doc.setData(prepareData(data, letterType));
    
    try {
        doc.render();
    } catch (error: any) {
        console.error(JSON.stringify({ error: error.message, properties: error.properties }));
        throw error;
    }

    return doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
};

export const downloadDocx = async (letterType: LetterType, templateFile: string, data: UserData & InactionTemplateData, filename: string): Promise<void> => {
    try {
        const blob = await generateDocxBlob(letterType, templateFile, data);
        saveAs(blob, filename);
    } catch (error) {
        console.error('Ошибка при создании DOCX документа:', error);
        throw error;
    }
};

export const downloadPdf = async (letterType: LetterType, templateFile: string, data: UserData & InactionTemplateData, filename: string): Promise<void> => {
    const apiKey = '81eabaf4-e5f0-4451-90f4-937ba7e99b2c';
    const apiUrl = 'https://api.cloudmersive.com/convert/docx/to/pdf';

    console.log('[PDF] Initiating PDF download via Cloudmersive API.');

    try {
        console.log('[PDF] Step 1: Generating DOCX blob in memory...');
        const docxBlob = await generateDocxBlob(letterType, templateFile, data);
        console.log('[PDF] Step 1: DOCX blob generated successfully.');

        console.log('[PDF] Step 2: Sending DOCX to Cloudmersive API for conversion...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Apikey': apiKey,
                'Content-Type': 'application/octet-stream'
            },
            body: docxBlob
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API Error (${response.status}): ${errorBody}`);
        }
        
        console.log('[PDF] Step 2: Conversion successful. Downloading PDF...');
        const pdfBlob = await response.blob();
        saveAs(pdfBlob, filename);
        console.log('[PDF] Step 3: PDF saved.');

    } catch (error) {
        console.error('Ошибка при создании PDF документа через API:', error);
        throw error;
    }
};
