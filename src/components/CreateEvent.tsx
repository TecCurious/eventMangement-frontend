"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
interface EventFormData {
  name: string;
  description: string;
  date: string;
  image: File | null;
}

interface ValidationErrors {
  name?: string;
  description?: string;
  date?: string;
  image?: string;
}

const CreateEventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    date: '',
    image: null,
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Event name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < currentDate) {
      newErrors.date = 'Date cannot be in the past';
    }

    if (!formData.image) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/events`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        toast('Event created successfully!');
        setFormData({
          name: '',
          description: '',
          date: '',
          image: null,
        });
        setImagePreview(null);
      } else {
        throw new Error(data.error || 'Failed to create event');
      }
    } catch (error) {
      console.error(error);
      toast('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create New Event
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name Field */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter event name"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={loading}
              rows={4}
              placeholder="Enter event description"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.description 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label 
              htmlFor="date" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Event Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.date 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label 
              htmlFor="image" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Event Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              disabled={loading}
              accept="image/*"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.image 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
            {imagePreview && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </div>
            ) : (
              'Create Event'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;