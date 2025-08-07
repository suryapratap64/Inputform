'use client';

import { FormData } from '../CustomsDeclarationForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Ship, MapPin, Calendar } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

const INDIAN_PORTS = [
  'INNSA - JNPT (Nhava Sheva)',
  'INMAA1 - Chennai',
  'INKOC1 - Kolkata',
  'INMUN11 - Mumbai',
  'INIXE - Cochin',
  'INVTZ1 - Visakhapatnam',
  'INPAV1 - Tuticorin',
  'INDEL6 - ICD Tughlakabad'
];

const BILL_TYPES = [
  'Bill of Entry (Import)',
  'Shipping Bill (Export)',
  'Ex-Bond Bill of Entry',
  'Into Bond Bill of Entry'
];

export default function ShipmentDetailsStep({ data, updateData }: Props) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Port of Loading */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              <Label htmlFor="portOfLoading">Port of Loading *</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The port where the goods are loaded onto the vessel</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={data.portOfLoading} onValueChange={(value) => updateData({ portOfLoading: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select port of loading" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_PORTS.map((port) => (
                  <SelectItem key={port} value={port}>{port}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Port of Discharge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" />
              <Label htmlFor="portOfDischarge">Port of Discharge *</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The port where the goods are unloaded from the vessel</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={data.portOfDischarge} onValueChange={(value) => updateData({ portOfDischarge: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select port of discharge" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_PORTS.map((port) => (
                  <SelectItem key={port} value={port}>{port}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Shipment Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-purple-500" />
              <Label htmlFor="shipmentDate">Shipment Date *</Label>
            </div>
            <Input
              id="shipmentDate"
              type="date"
              value={data.shipmentDate}
              onChange={(e) => updateData({ shipmentDate: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Bill Type */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="billType">Bill Type *</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Type of customs declaration document</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select value={data.billType} onValueChange={(value) => updateData({ billType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select bill type" />
              </SelectTrigger>
              <SelectContent>
                {BILL_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Ship size={20} className="text-blue-600" />
            Vessel Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vesselName">Vessel Name</Label>
              <Input
                id="vesselName"
                placeholder="e.g., MSC VIDHI"
                value={data.vesselName}
                onChange={(e) => updateData({ vesselName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voyageNumber">Voyage Number</Label>
              <Input
                id="voyageNumber"
                placeholder="e.g., 234E"
                value={data.voyageNumber}
                onChange={(e) => updateData({ voyageNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="containerNumber">Container Number</Label>
              <Input
                id="containerNumber"
                placeholder="e.g., MSCU1234567"
                value={data.containerNumber}
                onChange={(e) => updateData({ containerNumber: e.target.value })}
                className="uppercase"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Fields marked with * are mandatory. Ensure all vessel information matches your shipping documents.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}