'use client';

   
import { FormData } from '../CustomsDeclarationForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Send, FileText, Building, Globe, Package } from 'lucide-react';

interface Props {
  data: FormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ReviewSubmitStep({ data, onSubmit, isSubmitting }: Props) {
  const formatCurrency = (amount: string, currency: string = 'USD') => {
    if (!amount || amount === '0') return '-';
    return `${parseFloat(amount).toLocaleString()} ${currency}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  return (
    <div className="space-y-6">
         {/* //addtional step review and submit */}
      {/* Summary Header */}
      <div className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Review Your Declaration</h2>
        <p className="text-gray-600 mt-2">
          Please review all information carefully before submitting
        </p>
      </div>

      {/* Shipment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={20} className="text-blue-600" />
            Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Port of Loading</p>
              <p className="font-medium">{data.portOfLoading || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Port of Discharge</p>
              <p className="font-medium">{data.portOfDischarge || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Shipment Date</p>
              <p className="font-medium">{formatDate(data.shipmentDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bill Type</p>
              <Badge variant="secondary">{data.billType || '-'}</Badge>
            </div>
          </div>
          
          {(data.vesselName || data.voyageNumber || data.containerNumber) && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vessel Name</p>
                  <p className="font-medium">{data.vesselName || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Voyage Number</p>
                  <p className="font-medium">{data.voyageNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Container Number</p>
                  <p className="font-medium">{data.containerNumber || '-'}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Invoice & Product Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            Invoice & Product Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Invoice Number</p>
              <p className="font-medium">{data.invoiceNumber || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Invoice Date</p>
              <p className="font-medium">{formatDate(data.invoiceDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Invoice Value</p>
              <p className="font-medium text-green-600">
                {formatCurrency(data.invoiceValue, data.currency)}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">HS Code</p>
              <p className="font-medium">{data.hsCode || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Quantity & Unit</p>
              <p className="font-medium">
                {data.quantity && data.unit ? `${data.quantity} ${data.unit}` : '-'}
              </p>
            </div>
          </div>
          
          {data.description && (
            <div>
              <p className="text-sm text-gray-600">Product Description</p>
              <p className="font-medium">{data.description}</p>
            </div>
          )}

          {(data.freightAmount || data.insuranceAmount || data.assessableValue) && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Freight Amount</p>
                  <p className="font-medium">{formatCurrency(data.freightAmount, data.currency)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Insurance Amount</p>
                  <p className="font-medium">{formatCurrency(data.insuranceAmount, data.currency)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assessable Value</p>
                  <p className="font-medium text-blue-600">
                    {formatCurrency(data.assessableValue, data.currency)}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Party Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building size={20} className="text-purple-600" />
            Party Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Importer */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Building size={16} />
              Importer
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{data.importerName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PAN</p>
                <p className="font-medium">{data.importerPAN || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IEC</p>
                <p className="font-medium">{data.importerIEC || '-'}</p>
              </div>
            </div>
            {data.importerAddress && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{data.importerAddress}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Exporter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Globe size={16} />
              Exporter
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{data.exporterName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country</p>
                <p className="font-medium">{data.exporterCountry || '-'}</p>
              </div>
            </div>
            {data.exporterAddress && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{data.exporterAddress}</p>
              </div>
            )}
          </div>

          {data.dutyAmount && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-gray-600">Estimated Duty Amount</p>
                <p className="font-medium text-orange-600">
                  {formatCurrency(data.dutyAmount, 'INR')}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Submit Section */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-800">
                Ready to Submit Declaration
              </h3>
              <p className="text-green-700">
                By submitting this form, you confirm that all information provided is accurate 
                and complete to the best of your knowledge.
              </p>
            </div>
            
            <Button 
              onClick={onSubmit}
              size="lg"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Declaration
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}