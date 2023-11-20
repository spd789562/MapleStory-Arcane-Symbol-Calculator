import GoogleAD from '@/components/Ad';
import I18nText from '@/components/I18nText';

const AdInfo = () => {
  return (
    <div className="w-full bg-white mt-2 rounded-md">
      <div className="text-center text-stone-400 text-[12px]">
        <I18nText id="just_a_advertisement" />
        (´・ω・`)
      </div>
      <GoogleAD />
    </div>
  );
};

export default AdInfo;
