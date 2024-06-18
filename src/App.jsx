import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { ContactForm } from './components/ContactForm'
import { ContactList } from './components/ContactList'
import { SearchBar } from './components/SearchBar'
import { Header } from './components/Header'
import { EmptyState } from './components/EmptyState'

function App() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingContact, setEditingContact] = useState(null)

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    if (!searchTerm.trim()) return contacts
    
    const term = searchTerm.toLowerCase()
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term) ||
      contact.address.toLowerCase().includes(term)
    )
  }, [contacts, searchTerm])

  const handleAddContact = (contactData) => {
    if (editingContact) {
      // Update existing contact
      setContacts(prev => prev.map(contact => 
        contact.id === editingContact.id 
          ? { ...contactData, id: editingContact.id }
          : contact
      ))
      setEditingContact(null)
    } else {
      // Add new contact
      const newContact = {
        ...contactData,
        id: Date.now().toString()
      }
      setContacts(prev => [...prev, newContact])
    }
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
  }

  const handleDeleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId))
  }

  const handleCancelEdit = () => {
    setEditingContact(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <ContactForm
              onSubmit={handleAddContact}
              editingContact={editingContact}
              onCancel={handleCancelEdit}
            />
          </div>

          {/* Contact List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Contacts
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} total
                  </p>
                </div>
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>

              {filteredContacts.length === 0 ? (
                <EmptyState 
                  hasContacts={contacts.length > 0}
                  searchTerm={searchTerm}
                />
              ) : (
                <ContactList
                  contacts={filteredContacts}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App