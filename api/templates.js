import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Use /tmp for Vercel serverless, or local data folder for development
const isDev = process.env.NODE_ENV !== 'production';
const TEMPLATES_DIR = isDev 
  ? join(process.cwd(), 'data')
  : join('/tmp', 'templates');
const TEMPLATES_FILE = join(TEMPLATES_DIR, 'templates.json');

// Ensure directory exists
if (!existsSync(TEMPLATES_DIR)) {
  mkdirSync(TEMPLATES_DIR, { recursive: true });
}

// Initialize templates file if it doesn't exist
if (!existsSync(TEMPLATES_FILE)) {
  const defaultTemplates = [
    {
      id: 'default',
      name: 'Standard Reminder',
      subjectTemplate: 'Urgent: Dispatch of Pending Stock to RV Warehouse | {{ascName}}',
      htmlBodyTemplate: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1a1e2b;width:100%">
  <p style="margin:0 0 14px 0;">Dear <strong>{{ascName}}</strong>,</p>
  <p style="margin:0 0 14px 0;">We hope you are doing well.</p>
  <p style="margin:0 0 14px 0;">This is a gentle reminder to review your available stock (as per attached sheet) and arrange the dispatch of all pending items to the RV Warehouse by <strong>{{mailDate}}</strong>. We kindly request that all materials are sent in complete and good condition to avoid any issues upon receipt.</p>
  <p style="margin:0 0 14px 0;">In case we do not receive the complete stock by <strong>{{deadlineDate}}</strong>, or if it is received incomplete or not in proper condition, we may have to assume that the stock has not been dispatched. Accordingly, such pending stock may be <strong>treated as penalty accepted, as per the final stock value (including tax) mentioned in the table below</strong> at your end, and further billing may be processed for the same.</p>
  <p style="margin:0 0 14px 0;">We truly appreciate your cooperation and support in ensuring the timely and smooth handling of this matter.</p>
  {{summaryTableHtml}}
  <p style="margin:0 0 14px 0;">Please feel free to reach out to our warehouse team in case of any concerns or clarifications.</p>
  <p style="margin:16px 0 4px 0;">Thanks,</p>
  <p style="margin:0 0 4px 0;"><strong>Central Warehouse Team</strong></p>
  <p style="margin:0 0 20px 0;">RV Solutions</p>
  <div style="margin-top:20px;padding:10px 14px;background:#f4f2ec;border-radius:4px;font-size:11px;color:#6b7c70;">
    This is an automated system-generated mail. Please do not reply to this message.<br>
    For any queries, please contact your designated RV Solutions representative.<br>
    This communication is confidential and intended solely for the named recipient(s).
  </div>
</div>`,
      textBodyTemplate: `Dear {{ascName}},

We hope you are doing well.

This is a gentle reminder to review your available stock (as per attached sheet) and arrange the dispatch of all pending items to the RV Warehouse by {{mailDate}}. We kindly request that all materials are sent in complete and good condition to avoid any issues upon receipt.

In case we do not receive the complete stock by {{deadlineDate}}, or if it is received incomplete or not in proper condition, we may have to assume that the stock has not been dispatched. Accordingly, such pending stock may be treated as penalty accepted, as per the final stock value (including tax) at your end, and further billing may be processed for the same.

We truly appreciate your cooperation and support in ensuring the timely and smooth handling of this matter.

Please feel free to reach out to our warehouse team in case of any concerns or clarifications.

Thanks,
Central Warehouse Team
RV Solutions

---
This is an automated system-generated mail. Please do not reply to this message.
For any queries, please contact your designated RV Solutions representative.
This communication is confidential and intended solely for the named recipient(s).`,
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  writeFileSync(TEMPLATES_FILE, JSON.stringify(defaultTemplates, null, 2));
}

function readTemplates() {
  try {
    const data = readFileSync(TEMPLATES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading templates:', err);
    return [];
  }
}

function writeTemplates(templates) {
  try {
    writeFileSync(TEMPLATES_FILE, JSON.stringify(templates, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing templates:', err);
    return false;
  }
}

export default async function handler(req, res) {
  // Auth check
  const cookie = req.headers.cookie || '';
  if (!cookie.includes('rv_session=authenticated')) {
    return res.status(401).json({ error: 'Unauthorised — please log in' });
  }

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const templates = readTemplates();
        
        if (id) {
          const template = templates.find(t => t.id === id);
          if (!template) {
            return res.status(404).json({ error: 'Template not found' });
          }
          return res.status(200).json(template);
        } else {
          return res.status(200).json(templates);
        }
      } catch (err) {
        console.error('GET error:', err);
        return res.status(500).json({ error: 'Failed to read templates' });
      }

    case 'POST':
      try {
        const { name, subjectTemplate, htmlBodyTemplate, textBodyTemplate, isDefault } = req.body;
        
        if (!name || !subjectTemplate || !htmlBodyTemplate) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const templates = readTemplates();
        const newId = Date.now().toString();
        
        const newTemplate = {
          id: newId,
          name,
          subjectTemplate,
          htmlBodyTemplate,
          textBodyTemplate: textBodyTemplate || htmlBodyTemplate.replace(/<[^>]*>/g, ''),
          isDefault: isDefault || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        if (isDefault) {
          templates.forEach(t => { t.isDefault = false; });
        }

        templates.push(newTemplate);
        writeTemplates(templates);
        
        return res.status(201).json(newTemplate);
      } catch (err) {
        console.error('POST error:', err);
        return res.status(500).json({ error: 'Failed to create template' });
      }

    case 'PUT':
      try {
        if (!id) {
          return res.status(400).json({ error: 'Template ID required' });
        }

        const templates = readTemplates();
        const index = templates.findIndex(t => t.id === id);
        
        if (index === -1) {
          return res.status(404).json({ error: 'Template not found' });
        }

        const { name, subjectTemplate, htmlBodyTemplate, textBodyTemplate, isDefault } = req.body;
        
        const updatedTemplate = {
          ...templates[index],
          name: name || templates[index].name,
          subjectTemplate: subjectTemplate || templates[index].subjectTemplate,
          htmlBodyTemplate: htmlBodyTemplate || templates[index].htmlBodyTemplate,
          textBodyTemplate: textBodyTemplate || templates[index].textBodyTemplate,
          isDefault: isDefault !== undefined ? isDefault : templates[index].isDefault,
          updatedAt: new Date().toISOString()
        };

        if (updatedTemplate.isDefault && !templates[index].isDefault) {
          templates.forEach(t => { t.isDefault = false; });
        }

        templates[index] = updatedTemplate;
        writeTemplates(templates);
        
        return res.status(200).json(updatedTemplate);
      } catch (err) {
        console.error('PUT error:', err);
        return res.status(500).json({ error: 'Failed to update template' });
      }

    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ error: 'Template ID required' });
        }

        let templates = readTemplates();
        const templateToDelete = templates.find(t => t.id === id);
        
        if (!templateToDelete) {
          return res.status(404).json({ error: 'Template not found' });
        }

        if (templateToDelete.isDefault) {
          return res.status(400).json({ error: 'Cannot delete default template' });
        }

        templates = templates.filter(t => t.id !== id);
        writeTemplates(templates);
        
        return res.status(204).end();
      } catch (err) {
        console.error('DELETE error:', err);
        return res.status(500).json({ error: 'Failed to delete template' });
      }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}