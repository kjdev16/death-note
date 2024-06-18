import React from 'react'
import { Users, Search } from 'lucide-react'

export function EmptyState({ hasContacts, searchTerm }) {
  if (!hasContacts) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No contacts yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Get started by adding your first contact using the form on the left.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No contacts found
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        No contacts match your search for "{searchTerm}". Try adjusting your search terms.
      </p>
    </div>
  )
}