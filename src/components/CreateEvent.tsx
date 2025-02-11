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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-4 py-5 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              Create New Event
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className={`block w-full rounded-lg text-sm px-4 py-2.5 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } border focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="description" 
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className={`block w-full rounded-lg text-sm px-4 py-2.5 ${
                      errors.description 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } border focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="date" 
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className={`block w-full rounded-lg text-sm px-4 py-2.5 ${
                      errors.date 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } border focus:border-transparent focus:outline-none focus:ring-2 transition duration-200`}
                  />
                  {errors.date && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="image" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            disabled={loading}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.image}</p>
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white transition duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
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
      </div>
    </div>
  );
};

export default CreateEventForm;