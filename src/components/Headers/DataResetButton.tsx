'use client';
import Button from 'antd/lib/button';
import I18nText from '@/components/I18nText';

export default function DataResetButton() {
  const handleReset = () => {
    console.log('reset');
  };
  return (
    <Button onClick={handleReset} className="mr-2">
      <I18nText id="reset" />
    </Button>
  );
}
