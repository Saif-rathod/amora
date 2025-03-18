'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Upload, Calendar, Phone, Mail, MapPin, Loader2, Heart, Camera, Check, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Confetti from 'react-confetti';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useLovedOnes } from '@/hooks/use-loved-ones';

const formSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    relationship: z.string().min(1, 'Please select a relationship'),
    birthday: z.string().optional(),
    notes: z.string().optional(),
    occasions: z.array(z.object({
        type: z.string(),
        date: z.string(),
        description: z.string().optional()
    })).optional(),
    contactInfo: z.object({
        phone: z.string().optional(),
        email: z.string().email('Invalid email address').optional().or(z.literal('')),
        address: z.string().optional(),
    }).optional(),
    notifications: z.object({
        whatsapp: z.boolean().default(false),
        sms: z.boolean().default(false),
        email: z.boolean().default(false),
    }).optional(),
    preferences: z.object({
        favoriteColors: z.array(z.string()).optional(),
        interests: z.array(z.string()).optional(),
        giftPreferences: z.string().optional(),
    }).optional(),
    avatar: z.string().optional(),
});

export default function AddLovedOne() {
    const router = useRouter();
    const { toast } = useToast();
    const { addLovedOne } = useLovedOnes();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [step, setStep] = useState(1);
    const [occasions, setOccasions] = useState<Array<{ type: string; date: string; description?: string }>>([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [uploadedImage, setUploadedImage] = useState<string>('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setUploadedImage(base64String);
                setPreviewImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            relationship: '',
            notes: '',
            contactInfo: {
                phone: '',
                email: '',
                address: '',
            },
            notifications: {
                whatsapp: false,
                sms: false,
                email: false,
            },
            preferences: {
                favoriteColors: [],
                interests: [],
                giftPreferences: '',
            },
            avatar: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsSubmitting(true);

            // Validate required fields
            if (!values.name || !values.relationship || !selectedDate) {
                toast({
                    title: "Required Fields Missing",
                    description: "Please fill in all required fields.",
                    variant: "destructive",
                });
                setIsSubmitting(false);
                return;
            }
            
            // Format the date
            const formattedDate = selectedDate 
                ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
                : '';

            // Create the loved one object
            const lovedOneData = {
                name: values.name,
                relationship: values.relationship,
                birthday: formattedDate,
                avatar: uploadedImage || '/assets/images/headshot/headshot(1).webp',
                notes: values.notes,
                contactInfo: {
                    phone: phoneNumber,
                    email: values.contactInfo?.email || '',
                    address: values.contactInfo?.address || ''
                },
                notifications: {
                    whatsapp: values.notifications?.whatsapp || false,
                    sms: values.notifications?.sms || false,
                    email: values.notifications?.email || false
                },
                preferences: {
                    favoriteColors: values.preferences?.favoriteColors || [],
                    interests: values.preferences?.interests || [],
                    giftPreferences: values.preferences?.giftPreferences || ''
                },
                occasions: occasions.filter(o => o.type && o.date)
            };

            // Add the loved one
            const result = await addLovedOne(lovedOneData);
            
            if (result) {
                // Show success animation
                setShowConfetti(true);
                
                toast({
                    title: "Success!",
                    description: "Your loved one has been added successfully.",
                });

                // Wait for animation and redirect
                setTimeout(() => {
                    router.push('/loved-ones');
                }, 3000); // Increased timeout to 3 seconds
            }
        } catch (error) {
            console.error('Error adding loved one:', error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
            {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
            
            <Navbar />
            <div className="h-20"></div>
            
            <main className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/loved-ones" className="text-rose-500 hover:text-rose-600 transition-colors">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Add a Loved One</h1>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            {[1, 2, 3].map((stepNumber) => (
                                <div key={stepNumber} className="flex-1 relative">
                                    <div className={`h-2 ${stepNumber === 1 ? 'rounded-l-full' : stepNumber === 3 ? 'rounded-r-full' : ''} ${
                                        step >= stepNumber ? 'bg-rose-500' : 'bg-gray-200'
                                    } transition-colors duration-300`} />
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-600">
                                        {stepNumber === 1 ? 'Basic Info' : stepNumber === 2 ? 'Contact Details' : 'Preferences'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="border-none shadow-lg">
                        <CardContent className="p-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                {/* Photo Upload Section */}
                                                <div className="flex justify-center mb-8">
                                                    <div className="relative group">
                                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-b from-rose-100 to-rose-50 border-2 border-rose-100 shadow-inner">
                                                            {previewImage ? (
                                                                <img
                                                                    src={previewImage}
                                                                    alt="Preview"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <Camera className="w-8 h-8 text-rose-300" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-rose-700 transition-colors">
                                                            <Upload className="w-4 h-4" />
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter their name" {...field} className="text-base" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="relationship"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Relationship</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="text-base">
                                                                            <SelectValue placeholder="Select relationship" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {[
                                                                            'Parent', 'Child', 'Sibling', 'Spouse',
                                                                            'Friend', 'Relative', 'Colleague', 'Other'
                                                                        ].map((rel) => (
                                                                            <SelectItem key={rel} value={rel.toLowerCase()}>
                                                                                {rel}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <FormLabel className="text-base block mb-2">Birthday</FormLabel>
                                                        <div className="relative">
                                                            <DatePicker
                                                                selected={selectedDate}
                                                                onChange={(date) => setSelectedDate(date)}
                                                                dateFormat="MMMM d"
                                                                placeholderText="Select their birthday"
                                                                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background focus:ring-2 focus:ring-rose-200 focus:outline-none"
                                                                popperClassName="z-[1000]"
                                                                popperPlacement="bottom-start"
                                                                popperProps={{
                                                                    strategy: "fixed"
                                                                }}
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                            />
                                                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-rose-400" />
                                                        </div>
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="notes"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Notes</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Add any special notes about them..."
                                                                        className="resize-none text-base"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-4">
                                                    <div>
                                                        <FormLabel className="text-base block mb-2">Phone Number</FormLabel>
                                                        <PhoneInput
                                                            country={'in'}
                                                            value={phoneNumber}
                                                            onChange={phone => setPhoneNumber(phone)}
                                                            inputClass="!w-full !h-10 !text-base"
                                                            containerClass="!w-full"
                                                            buttonClass="!h-10 !border-input"
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="contactInfo.email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Email</FormLabel>
                                                                <FormControl>
                                                                    <Input type="email" placeholder="Enter their email" {...field} className="text-base" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="contactInfo.address"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Address</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Enter their address..."
                                                                        className="resize-none text-base"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="notifications.whatsapp"
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-base font-normal">
                                                                        WhatsApp
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="notifications.sms"
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-base font-normal">
                                                                        SMS
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="notifications.email"
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-base font-normal">
                                                                        Email
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900">Special Occasions</h3>
                                                    {occasions.map((occasion, index) => (
                                                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                                            <div>
                                                                <FormLabel className="text-base block mb-2">Occasion Type</FormLabel>
                                                                <Select
                                                                    value={occasion.type}
                                                                    onValueChange={(value) => {
                                                                        const newOccasions = [...occasions];
                                                                        newOccasions[index].type = value;
                                                                        setOccasions(newOccasions);
                                                                    }}
                                                                >
                                                                    <SelectTrigger className="text-base">
                                                                        <SelectValue placeholder="Select type" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {[
                                                                            'Anniversary', 'Graduation', 'Wedding',
                                                                            'Special Day', 'Other'
                                                                        ].map((type) => (
                                                                            <SelectItem key={type} value={type.toLowerCase()}>
                                                                                {type}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <FormLabel className="text-base block mb-2">Date</FormLabel>
                                                                <div className="relative">
                                                                    <DatePicker
                                                                        selected={occasions[index].date ? new Date(occasions[index].date) : null}
                                                                        onChange={(date) => {
                                                                            const newOccasions = [...occasions];
                                                                            newOccasions[index].date = date?.toISOString() || '';
                                                                            setOccasions(newOccasions);
                                                                        }}
                                                                        dateFormat="MMMM d"
                                                                        placeholderText="Select date"
                                                                        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background focus:ring-2 focus:ring-rose-200 focus:outline-none"
                                                                        popperClassName="z-[1000]"
                                                                        popperPlacement="bottom-start"
                                                                        popperProps={{
                                                                            strategy: "fixed"
                                                                        }}
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                    />
                                                                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-rose-400" />
                                                                </div>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FormLabel className="text-base block mb-2">Description</FormLabel>
                                                                <Input
                                                                    value={occasion.description || ''}
                                                                    onChange={(e) => {
                                                                        const newOccasions = [...occasions];
                                                                        newOccasions[index].description = e.target.value;
                                                                        setOccasions(newOccasions);
                                                                    }}
                                                                    placeholder="Add a description..."
                                                                    className="text-base"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setOccasions([...occasions, { type: '', date: '', description: '' }])}
                                                        className="w-full"
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Occasion
                                                    </Button>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-900">Gift Preferences</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="preferences.favoriteColors"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Favorite Colors</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Enter their favorite colors (comma-separated)"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(e.target.value.split(',').map(c => c.trim()))}
                                                                        className="text-base"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="preferences.interests"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Interests & Hobbies</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Enter their interests (comma-separated)"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(e.target.value.split(',').map(i => i.trim()))}
                                                                        className="text-base"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="preferences.giftPreferences"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base">Gift Preferences</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Any specific gift preferences or things to avoid..."
                                                                        className="resize-none text-base"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex justify-between pt-6 border-t">
                                        {step > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setStep(step - 1)}
                                                className="px-6"
                                            >
                                                <ArrowLeft className="h-4 w-4 mr-2" />
                                                Previous
                                            </Button>
                                        )}
                                        
                                        <Button
                                            type={step === 3 ? "submit" : "button"}
                                            onClick={() => {
                                                if (step < 3) {
                                                    let isValid = true;
                                                    if (step === 1) {
                                                        const nameValue = form.getValues('name');
                                                        const relationshipValue = form.getValues('relationship');
                                                        if (!nameValue || !relationshipValue || !selectedDate) {
                                                            toast({
                                                                title: "Required Fields",
                                                                description: "Please fill in all required fields before proceeding.",
                                                                variant: "destructive",
                                                            });
                                                            isValid = false;
                                                        }
                                                    }
                                                    if (isValid) {
                                                        setStep(step + 1);
                                                    }
                                                }
                                            }}
                                            className={`px-6 ${step === 3 ? 'bg-rose-600 hover:bg-rose-700' : 'bg-rose-500 hover:bg-rose-600'} text-white ml-auto`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center">
                                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                    Saving...
                                                </div>
                                            ) : step === 3 ? (
                                                <>
                                                    <Heart className="h-4 w-4 mr-2" />
                                                    Save
                                                </>
                                            ) : (
                                                <>
                                                    Next
                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}