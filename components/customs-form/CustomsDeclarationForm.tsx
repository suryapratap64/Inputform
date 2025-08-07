'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import ShipmentDetailsStep from './steps/ShipmentDetailsStep';
import InvoiceHSCodeStep from './steps/InvoiceHSCodeStep';
import ConsigneeInfoStep from './steps/ConsigneeInfoStep';
import ReviewSubmitStep from './steps/ReviewSubmitStep';

export interface FormData {
  // Shipment Details
  portOfLoading: string;
  portOfDischarge: string;
  shipmentDate: string;
  billType: string;
  vesselName: string;
  voyageNumber: string;
  containerNumber: string;
  
  // Invoice & HS Code Details
  invoiceNumber: string;
  invoiceDate: string;
  invoiceValue: string;
  currency: string;
  hsCode: string;
  description: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  
  // Consignee Information
  importerName: string;
  importerAddress: string;
  importerPAN: string;
  importerIEC: string;
  exporterName: string;
  exporterAddress: string;
  exporterCountry: string;
  
  // Additional Details
  freightAmount: string;
  insuranceAmount: string;
  assessableValue: string;
  dutyAmount: string;
}

const steps = [
  { id: 1, title: 'Shipment Details', description: 'Basic shipment information' },
  { id: 2, title: 'Invoice & HS Codes', description: 'Commercial details' },
  { id: 3, title: 'Consignee Info', description: 'Importer/Exporter details' },
  { id: 4, title: 'Review & Submit', description: 'Final review' }
];

export default function CustomsDeclarationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    portOfLoading: '',
    portOfDischarge: '',
    shipmentDate: '',
    billType: '',
    vesselName: '',
    voyageNumber: '',
    containerNumber: '',
    invoiceNumber: '',
    invoiceDate: '',
    invoiceValue: '',
    currency: 'USD',
    hsCode: '',
    description: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    importerName: '',
    importerAddress: '',
    importerPAN: '',
    importerIEC: '',
    exporterName: '',
    exporterAddress: '',
    exporterCountry: '',
    freightAmount: '',
    insuranceAmount: '',
    assessableValue: '',
    dutyAmount: ''
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.portOfLoading && formData.portOfDischarge && 
                 formData.shipmentDate && formData.billType);
      case 2:
        return !!(formData.invoiceNumber && formData.invoiceDate && 
                 formData.invoiceValue && formData.hsCode);
      case 3:
        return !!(formData.importerName && formData.importerPAN && 
                 formData.importerIEC && formData.exporterName);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Form Submitted Successfully!",
      description: "Your customs declaration has been processed and submitted.",
    });
    
    setIsSubmitting(false);
    setCompletedSteps(prev => [...prev, 4]);
  };

  const progress = (completedSteps.length / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShipmentDetailsStep 
            data={formData} 
            updateData={updateFormData}
          />
        );
      case 2:
        return (
          <InvoiceHSCodeStep 
            data={formData} 
            updateData={updateFormData}
          />
        );
      case 3:
        return (
          <ConsigneeInfoStep 
            data={formData} 
            updateData={updateFormData}
          />
        );
      case 4:
        return (
          <ReviewSubmitStep 
            data={formData} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster />
      
    
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                  completedSteps.includes(step.id) 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle size={16} />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="text-sm font-medium text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex justify-between pt-8 border-t mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}