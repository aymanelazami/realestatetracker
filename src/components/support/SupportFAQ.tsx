
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I create an agency profile?',
    answer: 'To create an agency profile, log in to your account and navigate to the "Add Agency" page. Fill out all required fields in the form and submit. Your agency profile will be reviewed by our team and published once approved.'
  },
  {
    question: 'How can I update my agency information?',
    answer: 'You can update your agency information by going to your "Agency Profile" page. Click on the "Edit" button, make the necessary changes, and click "Save". All updates will be reflected immediately.'
  },
  {
    question: 'What is the verification process for agencies?',
    answer: 'Our verification process involves confirming the legitimacy of your agency through official documents and contact information. Once you submit your agency profile, our team will review it and may contact you for additional information. Verification typically takes 1-2 business days.'
  },
  {
    question: 'How do I change my account password?',
    answer: 'To change your password, go to the "Settings" page from your profile dropdown menu. Under the "Security" section, click on "Change Password" and follow the instructions. You'll need to enter your current password first for verification.'
  },
  {
    question: 'Can I have multiple agencies under one account?',
    answer: 'Yes, if you're an admin user, you can manage multiple agencies under one account. Simply use the "Add Agency" function to create additional agency profiles. Each agency will have its own separate profile and management options.'
  },
  {
    question: 'How do I contact another agency through the platform?',
    answer: 'You can contact another agency by visiting their agency detail page. There, you'll find contact information or a direct messaging option. Simply click on the "Contact" button and fill out the form to send them a message.'
  },
  {
    question: 'Is there a limit to how many listings I can add?',
    answer: 'The number of listings you can add depends on your subscription plan. Free accounts have a limit of 5 active listings, while premium accounts have higher or unlimited listing capabilities. You can view your current limits in your account settings.'
  },
  {
    question: 'How can I delete my account?',
    answer: 'To delete your account, go to the "Settings" page and scroll to the bottom. Under "Danger Zone", you'll find the option to delete your account. Note that this action is permanent and will remove all your data from our system.'
  }
];

const SupportFAQ: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SupportFAQ;
