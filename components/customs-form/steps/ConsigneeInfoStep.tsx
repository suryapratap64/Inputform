'use client';
//consigneeinfo accordong to web link source create form third step
import { FormData } from '../CustomsDeclarationForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Building, User, Globe } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
}

export default function ConsigneeInfoStep({ data, updateData }: Props) {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Importer Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building size={20} className="text-blue-600" />
            Importer Information
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="importerName">Importer Name *</Label>
              <Input
                id="importerName"
                placeholder="Full legal name of the importer"
                value={data.importerName}
                onChange={(e) => updateData({ importerName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="importerAddress">Importer Address</Label>
              <Textarea
                id="importerAddress"
                placeholder="Complete address including pin code"
                value={data.importerAddress}
                onChange={(e) => updateData({ importerAddress: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="importerPAN">PAN Number *</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle size={14} className="text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Permanent Account Number issued by Income Tax Department</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="importerPAN"
                  placeholder="ABCDE1234F"
                  value={data.importerPAN}
                  onChange={(e) => updateData({ importerPAN: e.target.value.toUpperCase() })}
                  maxLength={10}
                  className="uppercase"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="importerIEC">IEC Number *</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle size={14} className="text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importer Exporter Code issued by DGFT</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="importerIEC"
                  placeholder="1234567890"
                  value={data.importerIEC}
                  onChange={(e) => updateData({ importerIEC: e.target.value })}
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exporter Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} className="text-green-600" />
            Exporter Information
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exporterName">Exporter Name *</Label>
              <Input
                id="exporterName"
                placeholder="Full name of the exporting company"
                value={data.exporterName}
                onChange={(e) => updateData({ exporterName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exporterAddress">Exporter Address</Label>
              <Textarea
                id="exporterAddress"
                placeholder="Complete address of the exporter"
                value={data.exporterAddress}
                onChange={(e) => updateData({ exporterAddress: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exporterCountry">Country of Export</Label>
              <Input
                id="exporterCountry"
                placeholder="e.g., China, Germany, USA"
                value={data.exporterCountry}
                onChange={(e) => updateData({ exporterCountry: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={20} className="text-purple-600" />
            Duty Calculation
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="dutyAmount">Estimated Duty Amount</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated customs duty based on assessable value and applicable rates</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="dutyAmount"
              placeholder="0.00"
              type="number"
              step="0.01"
              value={data.dutyAmount}
              onChange={(e) => updateData({ dutyAmount: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Verification Required:</strong> Ensure all importer details match with your IEC certificate. 
            Incorrect information may result in customs clearance delays.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}