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
  
  <div style="margin: 20px 0 16px 0; padding: 12px; background: #fef5e7; border-left: 4px solid #e5b13b; border-radius: 4px;">
    <p style="margin: 0 0 8px 0; font-weight: bold;">For any queries, please contact our team:</p>
  </div>
  
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-family: Arial, sans-serif; font-size: 13px;">
    <thead>
      <tr style="background: #1e2f2b; color: #fae669;">
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Name</th>
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Related to Contact</th>
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Contact No</th>
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Email</th>
       </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Anand Sarkar</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">WH Manager + Reverse Logistics + Docket Arrange</td>
        <td style="border: 1px solid #ddd; padding: 8px;">7061410672</td>
        <td style="border: 1px solid #ddd; padding: 8px;">ananda.sarkar@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Amit Kashyap</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Forward + Good Stock + Reverse Logistics</td>
        <td style="border: 1px solid #ddd; padding: 8px;">9548631092</td>
        <td style="border: 1px solid #ddd; padding: 8px;">amit.kashyap@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Zabir</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Complete Reverse Logistics</td>
        <td style="border: 1px solid #ddd; padding: 8px;">7011539585</td>
        <td style="border: 1px solid #ddd; padding: 8px;">zabir.beg@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Virender Shah</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Call Login- CRM Issue + New ASC On-boarding</td>
        <td style="border: 1px solid #ddd; padding: 8px;">9999422774</td>
        <td style="border: 1px solid #ddd; padding: 8px;">virender.shah@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Dev Raj Singh</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Boat + EVM + Matrix</td>
        <td style="border: 1px solid #ddd; padding: 8px;">7302788492</td>
        <td style="border: 1px solid #ddd; padding: 8px;">devraj.singh@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Keerti Prakash</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Lenovo + Ptron + Matrix</td>
        <td style="border: 1px solid #ddd; padding: 8px;">8595140575</td>
        <td style="border: 1px solid #ddd; padding: 8px;">keertip.maurya@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Priyanka</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Acwo + Pebble + Mobilla</td>
        <td style="border: 1px solid #ddd; padding: 8px;">8860441600</td>
        <td style="border: 1px solid #ddd; padding: 8px;">priyanka06@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Hema Negi</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Phillips (TPV)</td>
        <td style="border: 1px solid #ddd; padding: 8px;">8800813144</td>
        <td style="border: 1px solid #ddd; padding: 8px;">hema.negi@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Anandi</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">South ASCs Support</td>
        <td style="border: 1px solid #ddd; padding: 8px;">7838924528</td>
        <td style="border: 1px solid #ddd; padding: 8px;">anandhavalli@rvsolutions.in</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;"><strong>Manoj</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">Technical Support + Training</td>
        <td style="border: 1px solid #ddd; padding: 8px;">9818814250</td>
        <td style="border: 1px solid #ddd; padding: 8px;">manoj.kumar10@gmail.com</td>
      </tr>
    </tbody>
  </table>
  
  <div style="margin-top:20px;padding:10px 14px;background:#f4f2ec;border-radius:4px;font-size:11px;color:#6b7c70;">
    This is an automated system-generated mail. Please do not reply to this message.<br>
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

For any queries, please contact our team:

Name - Related to Contact - Contact No - Email
Anand Sarkar - WH Manager + Reverse Logistics + Docket Arrange - 7061410672 - ananda.sarkar@rvsolutions.in
Amit Kashyap - Forward + Good Stock + Reverse Logistics - 9548631092 - amit.kashyap@rvsolutions.in
Zabir - Complete Reverse Logistics - 7011539585 - zabir.beg@rvsolutions.in
Virender Shah - Call Login- CRM Issue + New ASC On-boarding - 9999422774 - virender.shah@rvsolutions.in
Dev Raj Singh - Boat + EVM + Matrix - 7302788492 - devraj.singh@rvsolutions.in
Keerti Prakash - Lenovo + Ptron + Matrix - 8595140575 - keertip.maurya@rvsolutions.in
Priyanka - Acwo + Pebble + Mobilla - 8860441600 - priyanka06@rvsolutions.in
Hema Negi - Phillips (TPV) - 8800813144 - hema.negi@rvsolutions.in
Anandi - South ASCs Support - 7838924528 - anandhavalli@rvsolutions.in
Manoj - Technical Support + Training - 9818814250 - manoj.kumar10@gmail.com

---
This is an automated system-generated mail. Please do not reply to this message.
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