"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export const LoginForm = () => {

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL not configured');
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok && data.error == "Invalid credentials") {
        // throw new Error(data.error || 'Login failed');
        toast.error("Invalid credentials");
        return;
      }

      localStorage.setItem('token', data.token);
      form.reset();


      if(data.user.emailVerified == false){
        toast("Please verify your email");
        router.push('/auth/verify-email');
        return;
      }
  
      toast(data.message || 'Login successful');
      router.push('/dashboard');
  
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-2xl font-bold text-center text-indigo-700">Welcome Back</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-700 font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

   
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-700 font-medium">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </Button>
          </div>
          
          {/* Registration Prompt */}
          <div className="mt-6 text-center space-y-2 border-t border-indigo-100 pt-6">
            <p className="text-gray-600">Don't have an account?</p>
            <Link
              href="/auth/register"
              className="block text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Create an account
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};