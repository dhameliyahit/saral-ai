// components/email/RichTextEditor.tsx
import React, { useState } from 'react';
import { FiBold, FiItalic, FiLink, FiList, FiCode } from 'react-icons/fi';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variables?: string[];
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your email content here...',
  variables = ['{candidate_name}', '{company_name}', '{job_title}', '{hiring_manager}']
}) => {
  const [showVariables, setShowVariables] = useState(false);

  const applyFormat = (format: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newValue = value;
    
    switch (format) {
      case 'bold':
        newValue = value.substring(0, start) + `**${selectedText}**` + value.substring(end);
        break;
      case 'italic':
        newValue = value.substring(0, start) + `*${selectedText}*` + value.substring(end);
        break;
      case 'link':
        newValue = value.substring(0, start) + `[${selectedText}](url)` + value.substring(end);
        break;
      case 'list':
        newValue = value + '\n- List item';
        break;
      case 'code':
        newValue = value.substring(0, start) + '`' + selectedText + '`' + value.substring(end);
        break;
    }
    
    onChange(newValue);
  };

  const insertVariable = (variable: string) => {
    const newValue = value + ` ${variable} `;
    onChange(newValue);
    setShowVariables(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => applyFormat('bold')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Bold"
          >
            <FiBold className="text-lg" />
          </button>
          <button
            onClick={() => applyFormat('italic')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Italic"
          >
            <FiItalic className="text-lg" />
          </button>
          <button
            onClick={() => applyFormat('link')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Insert Link"
          >
            <FiLink className="text-lg" />
          </button>
          <button
            onClick={() => applyFormat('list')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Insert List"
          >
            <FiList className="text-lg" />
          </button>
          <button
            onClick={() => applyFormat('code')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Inline Code"
          >
            <FiCode className="text-lg" />
          </button>
        </div>

        {/* Variables Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowVariables(!showVariables)}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
          >
            Insert Variable
          </button>
          
          {showVariables && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-2">
                <p className="text-xs text-gray-500 font-medium mb-2">Available Variables</p>
                {variables.map((variable) => (
                  <button
                    key={variable}
                    onClick={() => insertVariable(variable)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors duration-200"
                  >
                    {variable}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-64 p-4 resize-none focus:outline-none text-gray-900"
      />

      {/* Preview Toggle */}
      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">{value.length} characters</span>
            <span className="text-gray-600">{value.split(/\s+/).length} words</span>
          </div>
          
          <div className="text-xs text-gray-500">
            Use **bold** for bold text and *italic* for italic text
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;