import React from 'react'
import { Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react'

export function ContactList({ contacts, onEdit, onDelete }) {
  const handleDelete = (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id)
    }
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {contact.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
                
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{contact.address}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onEdit(contact)}
                className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                title="Edit contact"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handleDelete(contact)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete contact"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}