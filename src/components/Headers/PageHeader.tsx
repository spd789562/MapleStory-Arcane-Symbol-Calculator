import LangSelect from './LangSelect';
import DataResetButton from './DataResetButton';
import I18nText from '@/components/I18nText';

export default function PageHeader() {
  return (
    <div className="px-4 w-full bg-header-icon bg-no-repeat bg-origin-content flex items-center justify-between flex-wrap xl:max-w-header-max xl:mx-auto">
      <h2 className="mb-0 pl-1">
        <I18nText id="title" />
      </h2>
      <div className="ml-auto mr-16">
        <DataResetButton />
        <LangSelect />
      </div>
    </div>
  );
}
