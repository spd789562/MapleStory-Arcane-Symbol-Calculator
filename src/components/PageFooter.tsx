'use client';
import { useTranslations } from 'next-intl';

export default function PageFooter() {
  const t = useTranslations();
  return (
    <>
      <div>
        {t('other_tools')}：
        <a href="https://maplesalon.vercel.app">{t('web_maplesalon')}</a>、
        <a href="https://maplestory-home-simulator.vercel.app">{t('web_my_home')}</a>、
        <a href="https://maplestory-boss-crystal-calculator.vercel.app">{t('web_boss_crystal_calculator')}</a>
      </div>
      {t('title')} ©2020 Created by 丫村
    </>
  );
}
