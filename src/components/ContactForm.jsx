import React from 'react'
import { useState, useEffect } from 'react'
import { UserPlus, Save, X } from 'lucide-react'

export function ContactForm({ onSubmit, editingContact, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || '',
        email: editingContact.email || '',
        phone: editingContact.phone || '',
        address: editingContact.address || ''
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      })
    }
    setErrors({})
  }, [editingContact])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
      if (!editingContact) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: ''
        })
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: ''
    })
    setErrors({})
    onCancel()
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-lg">
          {editingContact ? (
            <Save className="w-4 h-4 text-primary-600" />
          ) : (
            <UserPlus className="w-4 h-4 text-primary-600" />
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          {editingContact ? 'Edit Contact' : 'Add New Contact'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`input-field ${errors.address ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            {editingContact ? (
              <>
                <Save className="w-4 h-4" />
                Update Contact
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Add Contact
              </>
            )}
          </button>
          
          {editingContact && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}