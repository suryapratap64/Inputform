'use client';

import { FormData } from '../CustomsDeclarationForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, FileText, Hash, DollarSign } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'AED'];
const UNITS = ['KGS', 'MT', 'LTR', 'PCS', 'SET', 'PAIR', 'DOZ', 'GROSS'];

export default function InvoiceHSCodeStep({ data, updateData }: Props) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Invoice Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            Invoice Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input
                id="invoiceNumber"
                placeholder="e.g., INV-2024-001"
                value={data.invoiceNumber}
                onChange={(e) => updateData({ invoiceNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date *</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={data.invoiceDate}
                onChange={(e) => updateData({ invoiceDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-green-500" />
                <Label htmlFor="invoiceValue">Invoice Value *</Label>
              </div>
              <Input
                id="invoiceValue"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={data.invoiceValue}
                onChange={(e) => updateData({ invoiceValue: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="currency">Currency *</Label>
            <Select value={data.currency} onValueChange={(value) => updateData({ currency: value })}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* HS Code & Product Details */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Hash size={20} className="text-purple-600" />
            HS Code & Product Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="hsCode">HS Code *</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Harmonized System Code for product classification</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="hsCode"
                placeholder="e.g., 8471.30.90"
                value={data.hsCode}
                onChange={(e) => updateData({ hsCode: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the goods"
                value={data.description}
                onChange={(e) => updateData({ description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                placeholder="0"
                type="number"
                value={data.quantity}
                onChange={(e) => updateData({ quantity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={data.unit} onValueChange={(value) => updateData({ unit: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price</Label>
              <Input
                id="unitPrice"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={data.unitPrice}
                onChange={(e) => updateData({ unitPrice: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Total Value</Label>
              <Input
                value={data.quantity && data.unitPrice ? 
                  (parseFloat(data.quantity) * parseFloat(data.unitPrice)).toFixed(2) : '0.00'}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Charges</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freightAmount">Freight Amount</Label>
              <Input
                id="freightAmount"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={data.freightAmount}
                onChange={(e) => updateData({ freightAmount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceAmount">Insurance Amount</Label>
              <Input
                id="insuranceAmount"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={data.insuranceAmount}
                onChange={(e) => updateData({ insuranceAmount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="assessableValue">Assessable Value</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Value on which customs duty is calculated</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="assessableValue"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={data.assessableValue}
                onChange={(e) => updateData({ assessableValue: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Important:</strong> Ensure HS codes are accurate as they determine applicable duty rates. 
            Refer to the Indian Customs Tariff for correct classification.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}