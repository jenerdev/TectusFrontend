'use client';
import {
  UiAutocomplete,
  UiButton,
  UiSelect,
  UiSwitch,
  UiTextField,
  UiTypography,
} from '@tectus/ui';
import { PageBanner } from '../components';
import { useBEM } from '@tectus/hooks';
import './submit-info-page.scss';
import { useRouter } from 'next/navigation';
import { UiCheckbox } from '@tectus/ui/UiCheckbox/UiCheckbox';
// import { useCallback, useState } from 'react';

const states = {
  AL: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
  AK: ['Anchorage', 'Fairbanks', 'Juneau'],
  AZ: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe'],
  AR: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale'],
  CA: [
    'Los Angeles',
    'San Diego',
    'San Jose',
    'San Francisco',
    'Fresno',
    'Sacramento',
    'Long Beach',
    'Oakland',
    'Bakersfield',
    'Anaheim',
    'Riverside',
    'Stockton',
    'Irvine',
    'Chula Vista',
  ],
  CO: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Aspen'],
  CT: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury'],
  DE: ['Wilmington', 'Dover'],
  FL: [
    'Jacksonville',
    'Miami',
    'Tampa',
    'Orlando',
    'St. Petersburg',
    'Hialeah',
    'Tallahassee',
    'Fort Lauderdale',
  ],
  GA: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah'],
  HI: ['Honolulu', 'Hilo'],
  ID: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls'],
  IL: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford'],
  IN: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend'],
  IA: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City'],
  KS: ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'],
  KY: ['Louisville', 'Lexington', 'Bowling Green'],
  LA: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'],
  ME: ['Portland', 'Lewiston', 'Bangor'],
  MD: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring'],
  MA: ['Boston', 'Worcester', 'Springfield', 'Cambridge'],
  MI: ['Detroit', 'Grand Rapids', 'Warren', 'Ann Arbor', 'Lansing'],
  MN: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth'],
  MS: ['Jackson', 'Gulfport', 'Southaven'],
  MO: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
  MT: ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
  NE: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
  NV: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas'],
  NH: ['Manchester', 'Nashua', 'Concord'],
  NJ: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth'],
  NM: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe'],
  NY: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany'],
  NC: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
  ND: ['Fargo', 'Bismarck', 'Grand Forks'],
  OH: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'],
  OK: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow'],
  OR: ['Portland', 'Eugene', 'Salem', 'Gresham'],
  PA: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'],
  RI: ['Providence', 'Warwick', 'Cranston'],
  SC: ['Charleston', 'Columbia', 'North Charleston', 'Greenville'],
  SD: ['Sioux Falls', 'Rapid City'],
  TN: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'],
  TX: [
    'Houston',
    'San Antonio',
    'Dallas',
    'Austin',
    'Fort Worth',
    'El Paso',
    'Arlington',
    'Corpus Christi',
    'Plano',
    'Lubbock',
  ],
  UT: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan'],
  VT: ['Burlington', 'South Burlington'],
  VA: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond'],
  WA: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
  WV: ['Charleston', 'Huntington', 'Morgantown'],
  WI: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha'],
  WY: ['Cheyenne', 'Casper', 'Laramie'],
};

const services = [
  { value: 'executive_protection', label: 'Executive Protection' },
  { value: 'event_security', label: 'Event Security' },
  { value: 'facility_corporate_security', label: 'Facility & Corporate Security' },
  { value: 'retail_security', label: 'Retail Security' },
  { value: 'rapid_alarm_response', label: 'Rapid Alarm Response' },
  { value: 'tectus_transit_secure_transport', label: 'Tectus Transit (Secure Transport)' },
  { value: 'mobile_patrol', label: 'Mobile Patrol' },
  { value: 'fixed_post_security', label: 'Fixed-Post Security' },
  { value: 'foot_patrol', label: 'Foot Patrol' },
  { value: 'armed', label: 'Armed' },
  { value: 'unarmed', label: 'Unarmed' },
  { value: 'plainclothes', label: 'Plainclothes' },
  { value: 'uniformed', label: 'Uniformed' },
  { value: 'overnight_coverage', label: 'Overnight Coverage' },
  { value: 'vehicle_required', label: 'Vehicle Required' },
  { value: 'crowd_management', label: 'Crowd Management' },
  { value: 'bag_checks_metal_detection', label: 'Bag Checks / Metal Detection' },
  { value: 'radios_comms_equipment', label: 'Radios / Comms Equipment' },
  { value: 'walkthrough_metal_detectors', label: 'Walkthrough Metal Detectors' },
  { value: 'body_cams', label: 'Body Cams' },
  { value: 'hi_vis_gear_vests', label: 'Hi-Vis Gear / Vests' },
  { value: 'first_aid_kits', label: 'First Aid Kits' },
  { value: 'drone_surveillance', label: 'Drone Surveillance' },
  { value: 'wands_handheld_detectors', label: 'Wands / Handheld Detectors' },
  { value: 'k9_security_unit_available', label: 'K9 Security (K9 Unit Available)' },
  { value: 'access_control_management', label: 'Access Control Management' },
  { value: 'loss_prevention_undercover_ops', label: 'Loss Prevention / Undercover Ops' },
  {
    value: 'medical_training_cpr_certified_personnel',
    label: 'Medical Training / CPR Certified Personnel',
  },
  { value: 'bilingual_personnel', label: 'Bilingual Personnel' },
  { value: 'vip_escort', label: 'VIP Escort' },
  { value: 'off_duty_officers', label: 'Off-Duty Officers' },
];

const vehicles = [
  { value: 'mobile_patrol', label: 'Mobile Patrol' },
  { value: 'unmarked_mobile_patrol', label: 'Unmarked Mobile Patrol' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'armored', label: 'Armored' },
  { value: 'no_vehicles', label: 'No Vehicles' },
];

export default function SubmitInfo() {
  const { B, E } = useBEM('submit-info-page');
  const router = useRouter();
  // const [step, setStep] = useState(0);

  const handleSubmit = () => {
    router.push('alert/application-submitted');
  };

  const steps = ['Contact Info', 'Company Info', 'Personnel'];

  // const changeStep = useCallback(
  //   (action: 'next' | 'back') => {
  //     if (action === 'next') {
  //       if (step >= steps.length - 1) {
  //         return;
  //       }
  //       setStep(step + 1);
  //     } else {
  //       if (step <= 0) {
  //         return;
  //       }
  //       setStep(step - 1);
  //     }
  //   },
  //   [step],
  // );

  return (
    <div className={B()}>
      <PageBanner
        hideLogo
        title="Submit your information"
        subtitle="Please provide your company details subject to verification by Tectus."
      />

      <div className={E('form-scroll')}>
        <form className={E('form')}>
          <div className={E('form-section')}>
            <UiTypography variant="h6">Contact Info</UiTypography>
            <UiTextField
              placeholder="Email"
              label="Email"
              value="jener.sigua31@gmail.com"
              readonly
            />
            <UiTextField placeholder="Full Name" label="Full Name" />
            <UiTextField placeholder="Phone Number" label="Phone Number" />
          </div>

          <div className={E('form-section')}>
            <UiTypography variant="h6">Company Information</UiTypography>
            <UiTextField placeholder="Company Name" label="Company Name" />
            <UiTextField placeholder="Company Name" label="Company Name" />
            <UiTextField placeholder="Company Legal Entity" label="Company Legal Entity" />
            <UiTextField
              placeholder="Company Address (via Google Places Autocomplete)"
              label="Company Address (via Google Places Autocomplete)"
            />

            <div className={E('form-inline')}>
              <UiTextField placeholder="label Founded" label="label Founded" type="number" />
              <UiTextField placeholder="Website" label="Website" />
            </div>
          </div>

          <div className={E('form-section')}>
            <UiTypography variant="h6">Personnel Stats</UiTypography>
            <UiSelect
              label="Number of Employees"
              options={[
                { value: '1-9', label: '1-9' },
                { value: '11-49', label: '11-49' },
                { value: '50-99', label: '50-99' },
                { value: '100-199', label: '100-199' },
                { value: '200-249', label: '200-249' },
                { value: '250-499', label: '250-499' },
                { value: '500-999', label: '500-999' },
                { value: '1,000+', label: '1,000+' },
              ]}
              fullWidth
            />
            <UiSelect
              label="Number of Certified Subcontractors"
              options={[
                { value: '1-9', label: '1-9' },
                { value: '11-49', label: '11-49' },
                { value: '50-99', label: '50-99' },
                { value: '100-199', label: '100-199' },
                { value: '200-249', label: '200-249' },
                { value: '250-499', label: '250-499' },
                { value: '500-999', label: '500-999' },
                { value: '1,000+', label: '1,000+' },
              ]}
              fullWidth
            />
          </div>

          <div className={E('form-section')}>
            <UiTypography variant="h6">Service Areas</UiTypography>
            <div className={E('form-inline')}>
              <UiSelect
                label="States Covered"
                options={Object.keys(states).map((key) => ({ value: key, label: key }))}
                fullWidth
              />
              <UiSelect
                label="Cities Covered"
                options={states.AK.map((city) => ({ value: city, label: city }))}
                fullWidth
              />
            </div>

            <div className={E('form-section')}>
              <UiTypography variant="h6">Service Provided</UiTypography>
              <UiAutocomplete label="Services" options={services} fullWidth multiple />
            </div>

            <div className={E('form-section')}>
              <UiTypography variant="h6">Vehicle Used</UiTypography>
              <UiAutocomplete label="Vehicles" options={vehicles} fullWidth multiple />
            </div>

            <div className={E('form-section')}>
              <UiTypography variant="h6">Insurance Information</UiTypography>

              <UiSwitch label="Is your company currently insured?" />
              <UiTextField placeholder="Insurance Provider" label="Insurance Provider" />
              <UiSwitch label="If they have sub contractors are they covered by insurance?" />

              <UiButton variant="outlined" startIcon="upload" fullWidth>
                Upload Certificate of Insurance(s) (COI)
              </UiButton>
            </div>

            <div className={E('form-section')}>
              <UiTypography variant="h6">Licensing Information</UiTypography>

              <UiSwitch label="Is your company licensed?" />

              <UiButton variant="outlined" startIcon="upload" fullWidth>
                Upload License(s)
              </UiButton>
            </div>
            <div className={E('form-section')}>
              <UiTypography variant="h6">Terms & Conditions</UiTypography>
              <UiCheckbox label="Must accept terms before submission" />
              {/* <UiSwitch label="Is your company licensed?" /> */}
            </div>
          </div>
        </form>
      </div>

      <UiButton onClick={handleSubmit}>Submit Application</UiButton>

      {/* <UiStepper
        steps={steps.length}
        activeStep={step}
        backButton={<UiButton onClick={() => changeStep('back')}>back</UiButton>}
        nextButton={<UiButton onClick={() => changeStep('next')}>next</UiButton>}
      /> */}
    </div>
  );
}
