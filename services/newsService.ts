import type { Stock, NewsEvent } from '../types';

type StockConfig = Omit<Stock, 'priceHistory' | 'news'>;

// FIX: Define explicit types for news templates to ensure `impactRange` is treated as a tuple `[number, number]`
// instead of a general `number[]`, which was causing a type error in `getRandomImpact`.
interface NewsTemplate {
  title: string;
  content: string;
  impactRange: [number, number];
}

interface SectorTemplates {
  positive: NewsTemplate[];
  negative: NewsTemplate[];
}

const newsTemplates: Record<string, SectorTemplates> = {
  IT: {
    positive: [
      { title: "{stockName}, 차세대 AI 칩 'G-Brain' 개발 성공!", content: "{stockName}가(이) 시장의 예상을 뛰어넘는 성능의 차세대 AI 반도체 'G-Brain'을 공개했습니다. 이로 인해 글로벌 빅테크 기업들의 선주문이 폭주하고 있으며, 향후 실적에 대한 기대감이 커지고 있습니다.", impactRange: [0.05, 0.12] },
      { title: "글로벌 점유율 1위 달성! {stockName}의 쾌거", content: "시장조사업체 'Tech-Stats'에 따르면, {stockName}의 주력 제품이 이번 분기 글로벌 시장 점유율 1위를 기록했습니다. 이는 경쟁사를 압도하는 기술력과 마케팅 전략의 승리로 평가됩니다.", impactRange: [0.04, 0.09] },
      { title: "{stockName}, 클라우드 사업부 분기 최대 실적 달성", content: "클라우드 컴퓨팅 시장의 급성장에 힘입어 {stockName}의 클라우드 사업부가 분기 최대 매출과 영업이익을 달성했다고 발표했습니다. 인공지능(AI) 서비스와의 시너지가 주효했다는 분석입니다.", impactRange: [0.04, 0.08] },
      { title: "{stockName}, 메타버스 플랫폼 'G-World' 출시", content: "차세대 인터넷으로 주목받는 메타버스 시장에 {stockName}가(이) 본격적으로 진출합니다. 자체 플랫폼 'G-World'를 공개하며 새로운 생태계 구축에 대한 기대감을 높이고 있습니다.", impactRange: [0.06, 0.11] },
      { title: "정부, 'AI 반도체 육성 펀드' 조성... {stockName} 최대 수혜 예상", content: "정부가 시스템 반도체 경쟁력 강화를 위해 대규모 AI 반도체 육성 펀드를 조성하기로 했습니다. 국내 대표 기업인 {stockName}가(이) 가장 큰 수혜를 입을 것으로 전망됩니다.", impactRange: [0.03, 0.07] },
    ],
    negative: [
      { title: "{stockName}, 2분기 실적 예상 하회... '어닝 쇼크'", content: "{stockName}의 2분기 영업이익이 시장 컨센서스를 크게 밑도는 '어닝 쇼크'를 기록했습니다. 스마트폰 시장의 성장 둔화와 반도체 가격 하락이 주요 원인으로 분석됩니다.", impactRange: [-0.08, -0.04] },
      { title: "주력 공장 화재 발생, 생산 차질 불가피", content: "어젯밤 {stockName}의 핵심 생산 라인에서 화재가 발생하여 공장 가동이 전면 중단되었습니다. 회사 측은 복구에 수 주가 소요될 것이라고 밝혀, 단기적인 생산 차질과 실적 악화가 우려됩니다.", impactRange: [-0.10, -0.05] },
      { title: "EU, {stockName}에 반독점법 위반으로 거액의 과징금 부과", content: "유럽연합(EU) 집행위원회가 {stockName}에 대해 시장 지배적 지위를 남용했다는 이유로 수천억 원에 달하는 과징금을 부과했습니다. 이는 향후 유럽 시장에서의 사업 활동에 부담으로 작용할 전망입니다.", impactRange: [-0.07, -0.04] },
      { title: "개인정보 대규모 유출 사고 발생", content: "{stockName}의 서비스에서 대규모 개인정보 유출 사고가 발생하여 논란이 되고 있습니다. 당국의 조사와 함께 집단 소송 움직임까지 보이며 기업 신뢰도에 큰 타격을 입었습니다.", impactRange: [-0.09, -0.05] },
      { title: "신제품 'G-Phone', 심각한 결함 발견으로 출시 연기", content: "{stockName}가(이) 야심차게 준비하던 신제품 'G-Phone'에서 심각한 하드웨어 결함이 발견되어 출시가 무기한 연기되었습니다. 연말 성수기 시장을 놓치게 되어 실적 악화가 불가피합니다.", impactRange: [-0.11, -0.06] },
    ]
  },
  자동차: {
    positive: [
      { title: "{stockName}, 미국 전기차 시장 판매량 1위 등극!", content: "{stockName}의 최신 전기차 모델 'E-Cruiser'가 미국 시장에서 폭발적인 인기를 끌며 경쟁사를 제치고 판매량 1위에 올랐습니다. 이는 {stockName}의 전기차 기술력을 입증하는 중요한 이정표입니다.", impactRange: [0.06, 0.13] },
      { title: "자율주행 기술 상용화 임박... 정부 승인 획득", content: "{stockName}가(이) 개발 중인 레벨4 자율주행 기술이 마침내 국토부의 임시 운행 허가를 받았습니다. 완전 자율주행 시대의 개막을 앞당겼다는 평가와 함께 미래 성장 동력에 대한 기대감이 높아지고 있습니다.", impactRange: [0.05, 0.10] },
      { title: "역대급 실적! {stockName}, 작년 영업이익 사상 최대", content: "고급차 및 SUV 판매 호조에 힘입어 {stockName}가(이) 지난해 사상 최대의 영업이익을 기록했습니다. 올해에도 신차 효과가 이어질 것으로 기대됩니다.", impactRange: [0.05, 0.09] },
      { title: "{stockName}, 글로벌 IT 기업과 자율주행 합작법인(JV) 설립", content: "미국의 IT 공룡 'Tech-Giant'와 손잡고 자율주행 기술 개발을 위한 합작법인을 설립한다고 {stockName}가(이) 발표했습니다. 미래차 시장 선점을 위한 강력한 시너지가 기대됩니다.", impactRange: [0.07, 0.14] },
      { title: "신규 전기차 전용 공장 착공, 생산 능력 대폭 확대", content: "{stockName}가(이) 급증하는 전기차 수요에 대응하기 위해 국내에 연간 30만 대 규모의 전기차 전용 공장을 짓기 시작했습니다. 이를 통해 생산 효율성과 시장 지배력이 더욱 강화될 전망입니다.", impactRange: [0.04, 0.08] },
    ],
    negative: [
      { title: "대규모 리콜 결정... {stockName} 신뢰도 타격", content: "{stockName}가(이) 주력 차종의 배터리 결함 문제로 전 세계적인 대규모 리콜을 발표했습니다. 이번 리콜로 인해 막대한 비용이 발생할 것으로 예상되며, 브랜드 이미지에도 큰 타격을 입을 전망입니다.", impactRange: [-0.09, -0.05] },
      { title: "노조 총파업 돌입, 국내 공장 생산 '올스톱'", content: "{stockName}의 노동조합이 임금 협상 결렬로 인해 전면 총파업에 돌입했습니다. 이로 인해 국내 모든 공장의 생산 라인이 멈춰 서며, 막대한 생산 차질이 예상됩니다.", impactRange: [-0.07, -0.03] },
      { title: "미국, 수입 자동차에 고율 관세 부과 검토", content: "미국 정부가 자국 산업 보호를 이유로 수입 자동차에 대한 고율 관세 부과를 검토하고 있다는 소식이 전해졌습니다. {stockName}의 최대 수출 시장인 미국에서의 가격 경쟁력 약화가 우려됩니다.", impactRange: [-0.08, -0.04] },
      { title: "차량용 반도체 수급난 심화, 생산 차질 장기화", content: "전 세계적인 차량용 반도체 공급 부족 현상이 심화되면서 {stockName}의 생산 라인이 가동과 중단을 반복하고 있습니다. 출고 지연이 장기화되면서 실적에 부정적인 영향이 커지고 있습니다.", impactRange: [-0.06, -0.03] },
      { title: "신차 안전도 평가서 최하 등급... 품질 논란", content: "미국 고속도로 안전보험협회(IIHS)가 실시한 충돌 테스트에서 {stockName}의 신형 SUV가 최하 등급을 받았습니다. 차량 안전성에 대한 소비자들의 우려가 커지며 판매량에 타격이 예상됩니다.", impactRange: [-0.07, -0.04] },
    ]
  },
  바이오: {
    positive: [
      { title: "신약 'Bio-Heal', FDA 최종 판매 승인!", content: "{stockName}가(이) 10년간 개발해 온 혁신 신약 'Bio-Heal'이 미국 식품의약국(FDA)의 최종 품목 허가를 획득했습니다. 이는 연간 수조 원의 매출을 기대할 수 있는 블록버스터급 신약으로 평가받고 있습니다.", impactRange: [0.10, 0.25] },
      { title: "{stockName}, 글로벌 제약사와 기술수출 계약 체결", content: "{stockName}가(이) 자체 개발한 신약 후보물질을 글로벌 빅파마에 수조 원 규모로 기술수출하는 계약을 체결했다고 공시했습니다. 이는 국산 신약 기술의 가치를 세계적으로 인정받은 사례입니다.", impactRange: [0.08, 0.20] },
      { title: "치매 치료제, 임상 2상 성공적 결과 발표", content: "{stockName}가(이) 개발 중인 알츠하이머 치료제가 임상 2상에서 긍정적인 결과를 도출했다고 밝혔습니다. 아직 성공 여부를 단정하긴 이르지만, 상용화에 대한 기대감이 높아지고 있습니다.", impactRange: [0.07, 0.15] },
      { title: "정부, 바이오헬스 산업 혁신 전략 발표... {stockName} 수혜 기대", content: "정부가 바이오헬스 산업을 차세대 주력 산업으로 육성하기 위한 종합적인 지원 대책을 발표했습니다. R&D 세액 공제 확대 등으로 {stockName}의 실적 개선이 기대됩니다.", impactRange: [0.04, 0.09] },
    ],
    negative: [
      { title: "임상 3상 실패... {stockName} 신약 개발 중단", content: "{stockName}의 핵심 파이프라인이었던 항암제 후보물질이 임상 3상에서 유의미한 데이터를 확보하는 데 실패했습니다. 이에 따라 회사는 해당 신약 개발을 공식적으로 중단한다고 밝혔습니다.", impactRange: [-0.20, -0.10] },
      { title: "식약처, {stockName} 주력 제품 제조정지 처분", content: "식품의약품안전처가 {stockName}의 주력 제품 생산 과정에서 규정 위반을 적발하여 3개월 제조정지 처분을 내렸습니다. 이로 인한 매출 감소와 신뢰도 하락이 예상됩니다.", impactRange: [-0.15, -0.08] },
      { title: "경쟁사, 동일 효능 신약 먼저 출시... 시장 선점 효과 상실", content: "{stockName}가(이) 개발하던 신약과 동일한 효능을 가진 경쟁사의 제품이 먼저 시장에 출시되었습니다. 이로 인해 {stockName}의 신약 가치가 크게 하락할 것으로 우려됩니다.", impactRange: [-0.18, -0.09] },
      { title: "분식회계 의혹, 금융당국 정밀 감리 착수", content: "금융감독원이 {stockName}의 개발비 자산 처리 과정에 문제가 있다고 보고 정밀 감리에 착수했습니다. 분식회계 사실이 드러날 경우 상장 폐지까지 이를 수 있어 투자 심리가 급격히 얼어붙고 있습니다.", impactRange: [-0.25, -0.12] },
    ]
  },
  화학: {
    positive: [
        { title: "{stockName}, 차세대 배터리 소재 개발 성공", content: "전기차 주행거리를 획기적으로 늘릴 수 있는 차세대 배터리 소재 개발에 성공했다고 {stockName}가(이) 발표했습니다. 글로벌 배터리 제조사들의 공급 문의가 쇄도하고 있습니다.", impactRange: [0.07, 0.15] },
        { title: "국제 유가 하락, {stockName} 원가 부담 감소로 수익성 개선 전망", content: "국제 유가가 안정세에 접어들면서 원재료 비용 부담이 크게 줄어들 것으로 보입니다. 이로 인해 {stockName}의 하반기 수익성이 대폭 개선될 것이라는 분석이 나오고 있습니다.", impactRange: [0.03, 0.06] },
        { title: "{stockName}, 미국에 대규모 배터리 양극재 공장 증설", content: "미국 인플레이션 감축법(IRA)에 대응하기 위해 {stockName}가(이) 현지에 대규모 양극재 공장을 증설하기로 결정했습니다. 북미 시장 지배력 강화가 기대됩니다.", impactRange: [0.05, 0.10] },
    ],
    negative: [
        { title: "중국발 공급 과잉, {stockName} 주력 제품 가격 급락", content: "중국 화학 업체들의 대규모 증설로 인해 {stockName}의 주력 제품이 공급 과잉 상태에 빠졌습니다. 제품 가격이 급락하면서 수익성 악화가 우려됩니다.", impactRange: [-0.08, -0.04] },
        { title: "환경 규제 강화, {stockName} 추가 비용 발생 우려", content: "정부의 탄소 배출 규제 강화 정책에 따라 {stockName}가(이) 대규모 친환경 설비 투자를 단행해야 할 것으로 보입니다. 이는 단기적인 비용 증가로 이어질 수 있습니다.", impactRange: [-0.05, -0.02] },
        { title: "{stockName} 공장, 유해물질 누출 사고 발생", content: "{stockName}의 생산 공장에서 유해 화학물질이 누출되는 사고가 발생하여 인근 주민들이 대피하는 소동이 벌어졌습니다. 환경 단체의 비판과 함께 당국의 강력한 제재가 예상됩니다.", impactRange: [-0.09, -0.04] },
    ]
  },
  금융: {
    positive: [
        { title: "기준금리 인상, {stockName} 순이자마진(NIM) 확대 기대", content: "한국은행이 기준금리를 0.25%p 인상함에 따라 {stockName}와(과) 같은 은행주들의 예대마진이 확대되어 수익성이 개선될 것이라는 전망이 지배적입니다.", impactRange: [0.03, 0.07] },
        { title: "{stockName}, 역대급 분기 배당 발표... 주주환원 정책 강화", content: "{stockName}가(이) 시장의 예상을 뛰어넘는 규모의 분기 배당을 결정했습니다. 강력한 주주환원 정책에 대한 긍정적인 평가가 이어지고 있습니다.", impactRange: [0.04, 0.08] },
        { title: "{stockName}, 인터넷전문은행 인수 발표... 디지털 전환 가속", content: "{stockName}가(이) 디지털 금융 경쟁력 강화를 위해 인터넷전문은행 'K-Bank'를 인수한다고 발표했습니다. 빅테크와의 경쟁에서 우위를 점하기 위한 승부수라는 평가입니다.", impactRange: [0.05, 0.09] },
    ],
    negative: [
        { title: "정부, 가계대출 규제 강화... {stockName} 성장성 둔화 우려", content: "정부가 급증하는 가계부채를 잡기 위해 강력한 대출 규제 정책을 발표했습니다. 이로 인해 {stockName}의 대출 성장세가 둔화될 것이라는 우려가 나오고 있습니다.", impactRange: [-0.06, -0.03] },
        { title: "금융사고 발생, {stockName} 내부통제 부실 논란", content: "수백억 원 규모의 횡령 사고가 {stockName} 내부에서 발생한 것으로 드러났습니다. 금융감독원은 즉시 현장 검사에 착수했으며, 내부통제 시스템의 부실에 대한 비판이 거세지고 있습니다.", impactRange: [-0.07, -0.04] },
        { title: "부동산 PF 부실 우려, {stockName} 충당금 부담 증가", content: "부동산 프로젝트파이낸싱(PF) 대출의 부실 위험이 커지면서 {stockName}가(이) 대규모 대손충당금을 쌓아야 할 것으로 보입니다. 이는 은행의 순이익 감소로 이어질 전망입니다.", impactRange: [-0.08, -0.04] },
    ]
  },
  철강: {
    positive: [
        { title: "글로벌 인프라 투자 확대, 철강 수요 급증 전망", content: "미국과 중국을 중심으로 한 대규모 인프라 투자 계획이 발표되면서, 건설 및 산업용 철강 수요가 크게 증가할 것으로 예상됩니다. {stockName}의 실적 개선 기대감이 높아지고 있습니다.", impactRange: [0.05, 0.10] },
        { title: "{stockName}, 친환경 수소환원제철 기술 개발 성공", content: "탄소 배출 없이 철강을 생산하는 '수소환원제철' 기술을 {stockName}가(이) 세계 최초로 상용화 단계까지 개발하는 데 성공했습니다. 이는 글로벌 철강 산업의 패러다임을 바꿀 혁신으로 평가됩니다.", impactRange: [0.07, 0.13] },
    ],
    negative: [
        { title: "중국산 저가 철강 공세, {stockName} 가격 경쟁력 약화", content: "중국산 저가 철강 제품이 대량으로 수입되면서 국내 철강 시장이 위협받고 있습니다. {stockName}는(은) 가격 경쟁에서 밀리며 수익성 악화를 겪고 있습니다.", impactRange: [-0.07, -0.04] },
        { title: "원재료 '철광석' 가격 급등, 원가 부담 가중", content: "주요 철광석 생산국의 생산 차질로 인해 국제 철광석 가격이 급등하고 있습니다. {stockName}의 원가 부담이 커지면서 2분기 실적에 빨간불이 켜졌습니다.", impactRange: [-0.06, -0.03] },
    ]
  },
  조선: {
    positive: [
        { title: "{stockName}, 카타르 LNG선 대규모 수주 성공!", content: "{stockName}가(이) 카타르 국영 석유사와 수조 원 규모의 LNG 운반선 건조 계약을 체결했습니다. 이는 수년간의 수주 가뭄을 끝내는 단비 같은 소식입니다.", impactRange: [0.08, 0.18] },
        { title: "{stockName}, 차세대 암모니아 추진선 세계 최초 수주", content: "국제해사기구(IMO)의 환경 규제 강화에 발맞춰 {stockName}가(이) 탄소 배출이 없는 암모니아 추진선을 세계 최초로 수주했습니다. 친환경 선박 시장을 선도할 것으로 기대됩니다.", impactRange: [0.07, 0.15] },
    ],
    negative: [
        { title: "후판 가격 급등, {stockName} 원가 부담 가중", content: "선박 건조의 핵심 원자재인 후판 가격이 급등하면서 {stockName}의 원가 부담이 커지고 있습니다. 수주 당시보다 원가가 크게 올라 수익성 악화가 불가피할 전망입니다.", impactRange: [-0.06, -0.03] },
        { title: "{stockName}, 해양플랜트 사업서 대규모 손실 발생", content: "{stockName}가(이) 과거 저가에 수주했던 해양플랜트 프로젝트에서 수천억 원 규모의 추가 손실이 발생했다고 공시했습니다. 이는 회사의 전체 실적을 끌어내리는 요인이 되고 있습니다.", impactRange: [-0.10, -0.05] },
    ]
  },
  유통: {
    positive: [
        { title: "정부, 내수 활성화 정책 발표... 소비 심리 회복 기대", content: "정부가 대규모 소비 쿠폰 발행 등 내수 경기 활성화 대책을 발표했습니다. 이로 인해 얼어붙었던 소비 심리가 회복되면서 {stockName}의 매출 증대가 기대됩니다.", impactRange: [0.04, 0.08] },
        { title: "{stockName}, 중국 단체 관광객 유치로 면세점 실적 '훨훨'", content: "중국 정부가 한국행 단체 관광을 전면 허용함에 따라 {stockName}의 면세점 매출이 급증하고 있습니다. '유커'들의 복귀로 실적 개선에 청신호가 켜졌습니다.", impactRange: [0.06, 0.11] },
    ],
    negative: [
        { title: "온라인 쇼핑 확산, 오프라인 매장 실적 부진", content: "이커머스 시장의 급성장으로 인해 {stockName}와(과) 같은 오프라인 유통업체들의 실적이 지속적으로 악화되고 있습니다. 시대의 변화에 맞는 새로운 성장 동력 확보가 시급하다는 지적입니다.", impactRange: [-0.06, -0.03] },
        { title: "소비 심리 위축, 백화점 명품 매출 '뚝'", content: "고금리, 고물가로 인해 소비자들의 지갑이 닫히면서 백화점의 명품 매출이 급감하고 있습니다. {stockName}의 주력 사업부인 백화점 부문의 실적 악화가 우려됩니다.", impactRange: [-0.05, -0.02] },
    ]
  },
  식품: {
    positive: [
        { title: "'K-푸드' 열풍! {stockName} 해외 수출 역대 최대", content: "드라마와 영화의 인기에 힘입어 'K-푸드'가 전 세계적인 인기를 끌고 있습니다. {stockName}의 주력 제품이 해외에서 날개 돋친 듯 팔리며 분기 최대 수출 실적을 기록했습니다.", impactRange: [0.05, 0.10] },
        { title: "{stockName}, 대체육 시장 진출... 신성장 동력 확보", content: "{stockName}가(이) 미래 먹거리로 주목받는 대체육 시장에 본격적으로 진출한다고 밝혔습니다. 신사업에 대한 기대감으로 투자자들의 관심이 쏠리고 있습니다.", impactRange: [0.04, 0.08] },
    ],
    negative: [
        { title: "곡물 가격 급등, {stockName} 원가 압박 심화", content: "국제 곡물 가격이 이상 기후 등의 영향으로 급등하면서 {stockName}의 원가 부담이 커지고 있습니다. 제품 가격 인상이 불가피할 것으로 보입니다.", impactRange: [-0.05, -0.02] },
        { title: "{stockName} 제품서 이물질 발견, 식약처 조사 착수", content: "{stockName}의 주력 제품에서 이물질이 발견되었다는 소비자 신고가 잇따르면서 식약처가 조사에 나섰습니다. 식품 안전 문제로 번질 경우 브랜드 이미지에 큰 타격이 예상됩니다.", impactRange: [-0.07, -0.04] },
    ]
  },
  엔터: {
    positive: [
        { title: "{stockName} 소속 아이돌, 빌보드 1위 쾌거!", content: "{stockName}의 대표 아이돌 그룹이 신곡으로 미국 빌보드 메인 싱글 차트 '핫 100'에서 1위를 차지했습니다. K팝의 위상을 한 단계 끌어올렸다는 평가입니다.", impactRange: [0.08, 0.18] },
        { title: "{stockName}, 글로벌 OTT와 대규모 콘텐츠 공급 계약", content: "{stockName}가(이) 세계 최대 OTT 플랫폼에 향후 3년간 드라마와 예능 프로그램을 공급하는 대규모 계약을 체결했습니다. 안정적인 수익원 확보와 함께 글로벌 인지도 상승이 기대됩니다.", impactRange: [0.06, 0.12] },
    ],
    negative: [
        { title: "핵심 멤버 재계약 불발, 그룹 활동 '빨간불'", content: "{stockName}의 주력 아이돌 그룹의 핵심 멤버가 재계약을 하지 않기로 결정했습니다. 그룹의 향후 활동에 차질이 예상되며, 팬덤의 동요가 커지고 있습니다.", impactRange: [-0.12, -0.07] },
        { title: "소속 연예인 학폭 논란, {stockName} 이미지 타격", content: "{stockName} 소속 유명 연예인이 학교 폭력 가해자로 지목되면서 논란의 중심에 섰습니다. 광고계의 손절이 이어지는 등 기업 이미지에 심각한 타격을 입고 있습니다.", impactRange: [-0.10, -0.06] },
    ]
  },
  통신: {
    positive: [
        { title: "{stockName}, 5G 가입자 1위 달성... 안정적 성장세", content: "5G 시장 경쟁에서 {stockName}가(이) 가장 많은 가입자를 확보하며 시장 1위 자리를 굳혔습니다. 안정적인 현금 흐름을 바탕으로 한 고배당 정책이 매력적이라는 평가입니다.", impactRange: [0.02, 0.05] },
        { title: "{stockName}, 데이터센터 사업 확장... AI 시대 수혜주 부각", content: "{stockName}가(이) AI 시대의 핵심 인프라인 데이터센터 사업을 대폭 확장한다고 발표했습니다. 새로운 성장 동력에 대한 기대감이 커지고 있습니다.", impactRange: [0.04, 0.07] },
    ],
    negative: [
        { title: "정부, 통신비 인하 압박... 수익성 악화 우려", content: "정부가 가계 통신비 부담을 줄이기 위해 통신사들에게 요금 인하를 강하게 압박하고 있습니다. 이로 인해 {stockName}의 수익성이 악화될 수 있다는 우려가 제기됩니다.", impactRange: [-0.04, -0.02] },
        { title: "전국적 통신 장애 발생, 보상금 '눈덩이'", content: "원인 미상의 화재로 {stockName}의 통신망에 전국적인 장애가 발생했습니다. 소상공인을 포함한 이용자들의 피해가 막심해, 천문학적인 규모의 보상금을 지급해야 할 것으로 보입니다.", impactRange: [-0.06, -0.03] },
    ]
  },
  운수: {
    positive: [
        { title: "해외여행 재개, 항공 수요 폭발적 증가", content: "코로나19 엔데믹으로 각국의 입국 제한이 풀리면서 해외여행 수요가 폭발적으로 증가하고 있습니다. {stockName}의 국제선 예약률이 90%를 넘어서며 실적 턴어라운드에 대한 기대감이 커지고 있습니다.", impactRange: [0.06, 0.12] },
        { title: "항공 화물 운임 급등, {stockName} 깜짝 실적 기록", content: "글로벌 물류 대란으로 항공 화물 운임이 사상 최고치를 경신하면서, 화물 사업 비중이 높은 {stockName}가(이) 시장의 예상을 뛰어넘는 '어닝 서프라이즈'를 기록했습니다.", impactRange: [0.05, 0.10] },
    ],
    negative: [
        { title: "국제 유가 급등, 유류비 부담으로 실적 악화", content: "국제 유가가 배럴당 100달러를 돌파하면서 {stockName}의 유류비 부담이 크게 증가했습니다. 항공 운임 인상에도 불구하고 수익성 악화가 불가피할 전망입니다.", impactRange: [-0.07, -0.04] },
        { title: "환율 급등, 외화 부채 부담 가중", content: "원-달러 환율이 급등하면서 항공기 리스 비용 등 외화 부채가 많은 {stockName}의 재무 부담이 커지고 있습니다. 이는 순이익 감소의 주요 원인이 될 수 있습니다.", impactRange: [-0.05, -0.02] },
    ]
  },
  건설: {
    positive: [
        { title: "정부, 대규모 신도시 건설 계획 발표", content: "정부가 수도권 주택 공급 확대를 위해 3기 신도시 이외에 추가적인 대규모 신도시 건설 계획을 발표했습니다. {stockName}와(과) 같은 대형 건설사들의 수주가 기대됩니다.", impactRange: [0.05, 0.10] },
        { title: "{stockName}, 사우디 '네옴시티' 프로젝트 참여 확정", content: "총사업비 5000억 달러 규모의 사우디아라비아 '네옴시티' 프로젝트에 {stockName}가(이) 주요 인프라 건설사로 참여하게 되었습니다. 제2의 중동 붐에 대한 기대감이 커지고 있습니다.", impactRange: [0.08, 0.15] },
    ],
    negative: [
        { title: "부동산 시장 침체, 미분양 아파트 속출", content: "금리 인상과 경기 둔화의 여파로 부동산 시장이 빠르게 식어가고 있습니다. {stockName}가(이) 분양한 아파트 단지에서 대규모 미분양이 발생하며 유동성 위기 우려가 커지고 있습니다.", impactRange: [-0.08, -0.04] },
        { title: "원자재 가격 급등, 건설 현장 '셧다운' 위기", content: "철근, 시멘트 등 주요 건설 원자재 가격이 급등하면서 공사비가 감당할 수 없는 수준으로 치솟고 있습니다. {stockName}의 다수 건설 현장에서 공사가 중단될 위기에 처했습니다.", impactRange: [-0.07, -0.03] },
    ]
  },
  default: {
    positive: [
       { title: "{stockName}, ESG 경영 최우수 기업 선정", content: "한국기업지배구조원은 {stockName}를(을) 올해의 ESG 경영 최우수 기업으로 선정했다고 밝혔습니다. 지속가능한 성장에 대한 긍정적인 평가가 이어지고 있습니다.", impactRange: [0.02, 0.04] },
       { title: "{stockName}, 자사주 매입 및 소각 결정... 주가 부양 의지", content: "{stockName}가(이) 주주가치 제고를 위해 대규모 자사주 매입 및 소각을 결정했다고 공시했습니다. 회사의 주가 부양 의지에 대한 시장의 긍정적인 반응이 기대됩니다.", impactRange: [0.03, 0.06] },
       { title: "{stockName}, 신용등급 'AA+'로 상향 조정", content: "글로벌 신용평가사 'S&P'가 {stockName}의 신용등급을 'AA'에서 'AA+'로 상향 조정했습니다. 안정적인 재무구조와 미래 성장성을 높이 평가받았습니다.", impactRange: [0.03, 0.05] },
    ],
    negative: [
        { title: "CEO, 배임 혐의로 검찰 조사", content: "{stockName}의 경영진이 회사 자금을 유용한 혐의로 검찰의 조사를 받고 있다는 소식이 전해졌습니다. 이로 인한 경영 리스크와 기업 이미지 하락이 우려됩니다.", impactRange: [-0.06, -0.03] },
        { title: "회계 처리 위반 적발, {stockName} 신뢰도 추락", content: "금융감독원의 정밀 감리 결과, {stockName}의 고의적인 회계 처리 위반 사실이 적발되었습니다. 투자자들의 신뢰가 크게 하락하며 주가에 악영향을 미치고 있습니다.", impactRange: [-0.10, -0.05] },
        { title: "{stockName}, 대주주 지분 매각... '오버행' 우려", content: "{stockName}의 최대주주가 보유 지분 일부를 블록딜(시간 외 대량매매) 방식으로 매각했습니다. 시장에 풀릴 대규모 물량(오버행)에 대한 우려로 주가가 약세를 보이고 있습니다.", impactRange: [-0.07, -0.04] },
    ]
  }
};


const getRandomImpact = (range: [number, number]) => {
    return Math.random() * (range[1] - range[0]) + range[0];
}

export const generateAllNews = (stocksConfig: StockConfig[], simulationDays: number): Record<string, NewsEvent[]> => {
    const allNews: Record<string, NewsEvent[]> = {};
    stocksConfig.forEach(stock => {
        allNews[stock.code] = []; // Initialize with empty array
    });

    for (let day = 0; day < simulationDays; day++) {
        // 매일 5개에서 7개의 종목에 대해 뉴스를 생성합니다.
        const newsCountForToday = 5 + Math.floor(Math.random() * 3); // 5, 6, or 7 news items

        // 중복되지 않게 랜덤 종목을 선택합니다.
        const shuffledStocks = [...stocksConfig].sort(() => 0.5 - Math.random());
        const selectedStocks = shuffledStocks.slice(0, newsCountForToday);

        for (const stock of selectedStocks) {
            const templates = newsTemplates[stock.sector as keyof typeof newsTemplates] || newsTemplates.default;
            
            const isPositive = Math.random() > 0.4; // 60% 확률로 긍정 뉴스
            const sourceTemplates = isPositive ? templates.positive : templates.negative;

            if (sourceTemplates && sourceTemplates.length > 0) {
                const template = sourceTemplates[Math.floor(Math.random() * sourceTemplates.length)];
                const impact = getRandomImpact(template.impactRange);

                const newsEvent: NewsEvent = {
                    day,
                    title: template.title.replace('{stockName}', stock.name),
                    content: template.content.replace('{stockName}', stock.name),
                    impact,
                };

                // 해당 종목의 뉴스 배열에 추가합니다.
                allNews[stock.code].push(newsEvent);
            }
        }
    }
    return allNews;
};