import React, { useState } from 'react';
import './UTMGenerator.css';

function UTMGenerator() {
  const [urlType, setUrlType] = useState('custom');
  const [customUrl, setCustomUrl] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [customCampaign, setCustomCampaign] = useState('');
  const [campaignType, setCampaignType] = useState('select'); // 'select' или 'custom'
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const products = {
    "Регистрация программ": "onlinepatent_reg",
    "Отсрочка платежей в Китай": "sinosure",
    "Экспресс-Овердрафт": "express_overdraft",
    "Виртуальная карта с кешбэком": "virtual_card",
    "Факторинг вместо кредита": "factoring_simple",
    "Ещё один счёт в рублях и валюте": "accounts_create",
    "Налоговая копилка под процент": "moneybox",
    "Сервис по работе с самозанятыми": "samozanyatye",
    "Торговый и интернет-эквайринг": "acquiring",
    "Бизнес-карта с кешбэком": "corp_card",
    "Кредит и рассрочка покупателям": "pos",
    "Повышенный процент на остаток": "percent_to_balance",
    "Зарплатный проект без комиссии": "payroll_project",
    "Реклама в Яндекс Бизнес": "yabiz",
    "Аналитика для маркетплейсов": "marketplace_analytics",
    "Гарантии для торгов, госзакупок": "bg",
    "Депозиты онлайн — срок от 1 дня": "deposit_classic",
    "Закупки из Китая с доставкой": "china_purchase",
    "Обучение со скидкой 5%": "yapracticum",
    "Регистрация товарного знака": "onlinepatent_2000",
    "Фулфилмент для маркетплейсов": "marketplace_fulfillment",
    "Управление складом онлайн": "storage_managment",
    "Юрист для ВЭД и госзакупок": "jur_garant_ved",
    "Ваша реклама — абонентам МТС": "mts_marketing",
    "Бухгалтерия Моё дело со скидкой": "buhobsluzhivanie",
    "Декларации, справки для таможни": "customs",
    "СБП и платежи по QR-коду": "onboarding_sbp",
    "Связь МТС — вдвое больше минут": "corpsim",
    "Кредит для селлеров": "sellplus",
    "Факторинг от МТС Банка": "factoring",
    "Онлайн бухгалтерия": "debet_credit",
    "Кредиты для бизнеса": "credit_pro",
    "Юридическая поддержка": "eus",
    "ВЭД для бизнеса": "ved",
    "Продавайте в кредит и рассрочку": "CreditBroker",
    "Виртуальный колл-центр": "virtual_ats",
    "Проверка и поиск контрагентов": "InsideReport",
    "MTS Cloud": "mts_cloud",
    "Охранные системы для бизнеса": "business_protection",
    "Сервис выхода на маркетплейсы": "marketplaces",
    "Торговый эквайринг за 1%": "acquiring_one_percent",
    "ВКЛ": "vkl",
    "Овердрафт": "overdraft",
    "Кредит": "credit"
};


  const channels = {
    "Call Centre": "CC",
    "Email": "E",
    "SMS": "S",
    "Push": "P",
    "Banner": "B",
    "Рег. Сеть": "RC",
    "Телемаркетинг": "TM",
    "Онбординг": "Onb",
    "Стикер": "St",
    "Pop-up": "Pp",
    "Новости": "N",
    "Инлайн": "I"
  };

  const sources = {
    "Экосистема": "Es",
    "РБ": "RB",
    "Собственная база": "BD",
    "Другое": "Etc"
  };

  const generateUrl = () => {
    const baseUrl = urlType === 'custom' 
      ? customUrl 
      : `https://b.mtsbank.ru/redirect/marketplace?productId=${products[selectedProduct]}/`;

    const campaignValue = urlType === 'custom' 
      ? (campaignType === 'custom' ? customCampaign : products[selectedProduct])
      : products[selectedProduct];

    const utmParams = new URLSearchParams({
      utm_source: 'cvm',
      utm_medium: `${selectedChannel}_${selectedSource}`,
      utm_campaign: campaignValue,
      utm_term: '1',
      utm_content: utmContent
    });

    setGeneratedUrl(`${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${utmParams.toString()}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert('URL скопирован в буфер обмена');
  };

  return (
    <div className="container">
      <div className="generator-card">
        <h1>Генератор UTM-меток</h1>
        
        <div className="form-group">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="custom"
                checked={urlType === 'custom'}
                onChange={(e) => setUrlType(e.target.value)}
              />
              Своя ссылка
            </label>
            <label>
              <input
                type="radio"
                value="predefined"
                checked={urlType === 'predefined'}
                onChange={(e) => setUrlType(e.target.value)}
              />
              Выбрать продукт
            </label>
          </div>
        </div>

        {urlType === 'custom' ? (
          <div className="form-group">
            <label>URL:</label>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Введите URL"
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Продукт:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Выберите продукт</option>
              {Object.entries(products).map(([name]) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Канал:</label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            <option value="">Выберите канал</option>
            {Object.entries(channels).map(([name, code]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Источник:</label>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="">Выберите источник</option>
            {Object.entries(sources).map(([name, code]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
        </div>

        {urlType === 'custom' && (
          <div className="form-group">
            <label>UTM Campaign:</label>
            <div className="campaign-selector">
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="select"
                    checked={campaignType === 'select'}
                    onChange={(e) => setCampaignType(e.target.value)}
                  />
                  Выбрать из списка
                </label>
                <label>
                  <input
                    type="radio"
                    value="custom"
                    checked={campaignType === 'custom'}
                    onChange={(e) => setCampaignType(e.target.value)}
                  />
                  Свое значение
                </label>
              </div>
              
              {campaignType === 'select' ? (
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Выберите продукт для UTM</option>
                  {Object.entries(products).map(([name]) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={customCampaign}
                  onChange={(e) => setCustomCampaign(e.target.value)}
                  placeholder="Введите свое значение для UTM Campaign"
                />
              )}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>UTM Content:</label>
          <input
            type="text"
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
            placeholder="Введите идентификатор кампании"
          />
        </div>

        <button onClick={generateUrl} className="generate-button">
          Сгенерировать ссылку
        </button>

        {generatedUrl && (
          <div className="result">
            <h3>Сгенерированная ссылка:</h3>
            <p className="url">{generatedUrl}</p>
            <button onClick={copyToClipboard} className="copy-button">
              Копировать ссылку
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UTMGenerator;