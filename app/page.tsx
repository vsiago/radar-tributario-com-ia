'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calculator,
  ChevronDown,
  CircleHelp,
  FileCheck2,
  FileSearch,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Users,
  WalletCards,
  X,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  TrendingUp,
  Upload,
} from 'lucide-react'

const debts = [
  { company: 'Mercado São Bento Ltda.', cnpj: '12.345.678/0001-90', type: 'ICMS', original: 'R$ 248.390,00', updated: 'R$ 315.740,00', saving: 'R$ 92.560,00', status: 'Alta oportunidade', tone: 'emerald', initials: 'SB' },
  { company: 'Rede Bom Preço S.A.', cnpj: '45.987.321/0001-12', type: 'PIS / COFINS', original: 'R$ 184.200,00', updated: 'R$ 229.840,00', saving: 'R$ 54.120,00', status: 'Em análise', tone: 'amber', initials: 'BP' },
  { company: 'Supermercado Vila Nova', cnpj: '08.765.432/0001-55', type: 'INSS Patronal', original: 'R$ 96.750,00', updated: 'R$ 118.600,00', saving: 'R$ 31.480,00', status: 'Documentos pendentes', tone: 'slate', initials: 'VN' },
  { company: 'Atacadão Central', cnpj: '23.456.789/0001-34', type: 'ICMS-ST', original: 'R$ 421.800,00', updated: 'R$ 509.300,00', saving: 'R$ 138.900,00', status: 'Alta oportunidade', tone: 'emerald', initials: 'AC' },
]

const navItems = [
  { label: 'Visão geral', icon: LayoutDashboard, active: true },
  { label: 'Oportunidades', icon: FileSearch, badge: '12' },
  { label: 'Clientes', icon: Users },
  { label: 'Documentos fiscais', icon: ReceiptText },
  { label: 'Comissões', icon: WalletCards },
]

function WorkspacePage({ title, description, kind }: { title: string; description: string; kind: 'opportunities' | 'clients' | 'documents' | 'commissions' | 'simulator' | 'reports' | 'settings' | 'help' }) {
  const configs = {
    opportunities: { icon: FileSearch, label: 'CARTEIRA DE OPORTUNIDADES', value: '12 prioritárias', action: 'Nova análise' },
    clients: { icon: Users, label: 'BASE DE CLIENTES', value: '64 clientes ativos', action: 'Adicionar cliente' },
    documents: { icon: ReceiptText, label: 'CENTRAL FISCAL', value: '18 documentos pendentes', action: 'Enviar documento' },
    commissions: { icon: WalletCards, label: 'RECEITA DA OPERAÇÃO', value: 'R$ 126.324 projetados', action: 'Exportar relatório' },
    simulator: { icon: Calculator, label: 'CÁLCULO DE CENÁRIOS', value: 'Simule uma redução', action: 'Calcular cenário' },
    reports: { icon: FileCheck2, label: 'ACOMPANHAMENTO', value: '9 relatórios gerados', action: 'Gerar relatório' },
    settings: { icon: Settings, label: 'PREFERÊNCIAS', value: 'Conta e operação', action: 'Salvar alterações' },
    help: { icon: CircleHelp, label: 'SUPORTE À OPERAÇÃO', value: 'Como podemos ajudar?', action: 'Abrir chamado' },
  } as const
  const config = configs[kind]
  const Icon = config.icon
  const [principal, setPrincipal] = useState(248390)
  const [juros, setJuros] = useState(67350)
  const [reducao, setReducao] = useState(35)
  const [comissao, setComissao] = useState(15)
  const economia = Math.round((juros * reducao) / 100)
  const valorAcordo = principal + juros - economia
  const valorComissao = Math.round((economia * comissao) / 100)

  if (kind === 'simulator') {
    return <div className="workspace-page workspace-simulator simulator-screen">
      <div className="page-heading"><div><p className="eyebrow">CÁLCULO DE CENÁRIOS</p><h1>Simulador tributário</h1><p className="subtitle">Modele uma negociação e mostre ao cliente o impacto real da redução.</p></div><button className="primary-button" onClick={() => window.print()}><Download size={16} /> Exportar simulação</button></div>
      <div className="simulator-layout">
        <section className="simulator-form-card"><div className="card-heading"><div><span className="card-label">01 / DADOS DA DÍVIDA</span><h2>Monte o cenário</h2></div><span className="live-badge"><i /> Ao vivo</span></div><div className="field-grid"><label>Principal atualizado<input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></label><label>Juros e multas acumulados<input type="number" value={juros} onChange={(e) => setJuros(Number(e.target.value))} /></label><label>Redução negociada <strong>{reducao}%</strong><input type="range" min="0" max="80" value={reducao} onChange={(e) => setReducao(Number(e.target.value))} /></label><label>Comissão da consultoria <strong>{comissao}%</strong><input type="range" min="5" max="30" value={comissao} onChange={(e) => setComissao(Number(e.target.value))} /></label></div><div className="simulator-source"><FileSearch size={16} /><div><strong>Fontes consideradas</strong><span>SEFAZ, Receita Federal, PGFN e legislação vigente</span></div><button className="text-button">Editar fontes</button></div></section>
        <section className="simulator-result-card"><div className="result-top"><span className="card-label">02 / RESULTADO PROJETADO</span><span className="result-status"><CheckCircle2 size={15} /> Cenário viável</span></div><p className="result-caption">Economia estimada para o cliente</p><div className="result-value">R$ {economia.toLocaleString('pt-BR')}</div><div className="result-meter"><span style={{ width: `${reducao}%` }} /></div><div className="result-breakdown"><div><span>Valor atual</span><strong>R$ {(principal + juros).toLocaleString('pt-BR')}</strong></div><div><span>Valor negociado</span><strong>R$ {valorAcordo.toLocaleString('pt-BR')}</strong></div><div><span>Sua comissão</span><strong className="commission-value">R$ {valorComissao.toLocaleString('pt-BR')}</strong></div></div><button className="primary-button full-width" onClick={() => alert('Simulação salva na carteira de oportunidades.')}>Salvar na carteira <ArrowUpRight size={15} /></button></section>
      </div>
      <div className="simulator-bottom-grid"><section className="calculation-note"><div className="quick-icon blue"><ShieldCheck size={19} /></div><div><strong>Memória de cálculo</strong><p>A comissão é calculada exclusivamente sobre a economia efetivamente obtida com juros e multas, sem alterar o principal tributário.</p></div></section><section className="scenario-table"><div className="table-heading"><div><h2>Comparativo de cenários</h2><p>Veja como a margem muda conforme a negociação.</p></div></div><div className="scenario-row scenario-head"><span>CENÁRIO</span><span>REDUÇÃO</span><span>ECONOMIA</span><span>COMISSÃO</span></div>{[20, 35, 50].map((percent) => { const save = Math.round((juros * percent) / 100); return <div className="scenario-row" key={percent}><strong>{percent === reducao ? 'Selecionado' : `Cenário ${percent}%`}</strong><span>{percent}%</span><span>R$ {save.toLocaleString('pt-BR')}</span><strong className="saving">R$ {Math.round(save * comissao / 100).toLocaleString('pt-BR')}</strong></div> })}</section></div>
      <footer className="disclaimer"><ShieldCheck size={16} /><span>Simulação indicativa. A redução depende da modalidade de parcelamento, edital vigente e validação documental por profissional habilitado.</span></footer>
    </div>
  }
  return <div className={`workspace-page workspace-${kind}`}><div className="workspace-quick-action">{kind === 'opportunities' && <><div className="quick-icon"><FileSearch size={20} /></div><div><strong>Fila de priorização</strong><span>Ordene por economia potencial e prazo de prescrição.</span></div><button className="secondary-button">Recalcular fila</button></>}{kind === 'clients' && <><div className="quick-icon violet"><Users size={20} /></div><div><strong>Relacionamento ativo</strong><span>64 clientes acompanhados em 4 etapas de análise.</span></div><button className="secondary-button">Importar carteira</button></>}{kind === 'documents' && <><div className="quick-icon amber"><Upload size={20} /></div><div><strong>Caixa de entrada fiscal</strong><span>Envie XML, PGDAS-D, DCTF e documentos de suporte.</span></div><button className="secondary-button">Selecionar arquivos</button></>}{kind === 'commissions' && <><div className="quick-icon green"><WalletCards size={20} /></div><div><strong>Fechamento do mês</strong><span>R$ 84.216 já elegíveis para faturamento.</span></div><button className="secondary-button">Conferir repasses</button></>}{kind === 'simulator' && <><div className="quick-icon blue"><Calculator size={20} /></div><div><strong>Simulação rápida</strong><span>Compare juros atuais, cenário negociado e sua comissão.</span></div><button className="secondary-button">Abrir calculadora</button></>}{kind === 'reports' && <><div className="quick-icon"><FileCheck2 size={20} /></div><div><strong>Relatórios prontos para envio</strong><span>Escolha um cliente e gere um PDF com memória de cálculo.</span></div><button className="secondary-button">Novo relatório</button></>}{kind === 'settings' && <><div className="quick-icon violet"><Settings size={20} /></div><div><strong>Configuração da operação</strong><span>Defina regras de comissão, fontes e permissões da equipe.</span></div><button className="secondary-button">Revisar regras</button></>}{kind === 'help' && <><div className="quick-icon green"><CircleHelp size={20} /></div><div><strong>Atendimento especializado</strong><span>Consulte guias ou abra um chamado para o suporte Tributa.</span></div><button className="secondary-button">Ver guias</button></>}</div><div className="page-heading"><div><p className="eyebrow">{config.label}</p><h1>{title}</h1><p className="subtitle">{description}</p></div><button className="primary-button"><Plus size={17} /> {config.action}</button></div><div className="workspace-hero"><div className="hero-icon"><Icon size={24} /></div><div><span className="card-label">Resumo atual</span><h2>{config.value}</h2><p>Dados consolidados da sua operação tributária em um só lugar.</p></div><TrendingUp size={24} className="hero-trend" /></div><div className="inner-grid"><div className="chart-card"><div className="section-header"><div><h2>Atividade recente</h2><p>Movimentações dos últimos 30 dias.</p></div><CalendarDays size={18} className="muted-icon" /></div><div className="activity-list"><div><CheckCircle2 size={17} /><span>Análise concluída para Mercado São Bento<small>Hoje, 10:42</small></span><strong>R$ 92.560</strong></div><div><Clock3 size={17} /><span>Documentos aguardando revisão<small>Ontem, 16:18</small></span><strong>8 itens</strong></div><div><Upload size={17} /><span>Nova documentação recebida<small>28 out, 14:05</small></span><strong>3 arquivos</strong></div></div></div><div className="chart-card checklist"><div className="section-header"><div><h2>Próximos passos</h2><p>Organize seu fluxo de trabalho.</p></div></div><label><input type="checkbox" defaultChecked /> Validar documentos fiscais</label><label><input type="checkbox" /> Enviar proposta de honorários</label><label><input type="checkbox" /> Agendar reunião com cliente</label><label><input type="checkbox" /> Revisar fonte normativa</label></div></div><div className="table-section inner-table"><div className="table-heading"><div><h2>Registros recentes</h2><p>Últimos itens atualizados.</p></div><button className="text-button">Ver todos <ArrowUpRight size={15} /></button></div><div className="table-wrap"><table><thead><tr><th>ITEM</th><th>RESPONSÁVEL</th><th>ATUALIZAÇÃO</th><th>STATUS</th><th /></tr></thead><tbody>{['Mercado São Bento Ltda.', 'Rede Bom Preço S.A.', 'Supermercado Vila Nova'].map((item, index) => <tr key={item}><td><div className="company-cell"><div className="company-avatar slate"><FileText size={14} /></div><div><strong>{item}</strong><small>{index === 0 ? 'ICMS • Oportunidade tributária' : 'Documentação fiscal'}</small></div></div></td><td>Rafael Almeida</td><td>{index === 0 ? 'Hoje, 10:42' : 'Ontem, 16:18'}</td><td><span className={`status ${index === 0 ? 'emerald' : ''}`}><i />{index === 0 ? 'Concluído' : 'Em andamento'}</span></td><td><button className="row-menu" aria-label={`Opções de ${item}`}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></div><footer className="disclaimer"><ShieldCheck size={16} /><span>As estimativas são baseadas nos documentos fornecidos e em fontes públicas. Toda análise deve ser validada por um profissional habilitado.</span></footer></div>
}

function MetricCard({ label, value, detail, icon: Icon, trend, positive = true }: { label: string; value: string; detail: string; icon: typeof WalletCards; trend: string; positive?: boolean }) {
  return (
    <div className="metric-card">
      <div className="metric-topline"><span>{label}</span><span className="metric-icon"><Icon size={17} strokeWidth={1.8} /></span></div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail"><span className={positive ? 'trend up' : 'trend down'}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{trend}</span><span>{detail}</span></div>
    </div>
  )
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePage, setActivePage] = useState('overview')
  const [period, setPeriod] = useState('Últimos 30 dias')
  const [activeTab, setActiveTab] = useState('Todas')
  const [showModal, setShowModal] = useState(false)

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'mobile-visible' : ''}`}>
        <div className="brand"><div className="brand-mark"><ShieldCheck size={20} /></div><span>tributa<span className="brand-dot">.</span></span></div>
        <div className="workspace"><div className="workspace-avatar">VC</div><div><strong>Vértice Consultoria</strong><small>Conta principal</small></div><ChevronDown size={15} /></div>
        <nav className="main-nav" aria-label="Navegação principal">{navItems.map((item) => <button key={item.label} className={`nav-item ${activePage === 'overview' && item.active || activePage === item.label.toLowerCase().split(' ')[0] ? 'active' : ''}`} onClick={() => { setActivePage(item.label === 'Visão geral' ? 'overview' : item.label === 'Oportunidades' ? 'opportunities' : item.label === 'Clientes' ? 'clients' : item.label === 'Documentos fiscais' ? 'documents' : 'commissions'); setMobileOpen(false) }}><item.icon size={18} strokeWidth={1.8} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button>)}</nav>
        <div className="nav-section-label">Gestão</div>
        <nav className="main-nav"><button className={`nav-item ${activePage === 'simulator' ? 'active' : ''}`} onClick={() => { setActivePage('simulator'); setMobileOpen(false) }}><Calculator size={18} strokeWidth={1.8} /><span>Simulador tributário</span></button><button className={`nav-item ${activePage === 'reports' ? 'active' : ''}`} onClick={() => { setActivePage('reports'); setMobileOpen(false) }}><FileCheck2 size={18} strokeWidth={1.8} /><span>Relatórios</span></button></nav>
        <div className="sidebar-bottom"><button className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => { setActivePage('settings'); setMobileOpen(false) }}><Settings size={18} strokeWidth={1.8} /><span>Configurações</span></button><button className={`nav-item ${activePage === 'help' ? 'active' : ''}`} onClick={() => { setActivePage('help'); setMobileOpen(false) }}><CircleHelp size={18} strokeWidth={1.8} /><span>Central de ajuda</span></button><div className="user-profile"><div className="user-avatar">RA</div><div><strong>Rafael Almeida</strong><small>Administrador</small></div><MoreHorizontal size={17} /></div></div>
      </aside>
      {mobileOpen && <button className="mobile-backdrop" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}
      <section className="content-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={21} /></button><div className="breadcrumb"><span>Visão geral</span><span className="breadcrumb-separator">/</span><strong>Resumo da operação</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="Pesquisar"><Search size={18} /></button><button className="icon-button notification" aria-label="Notificações"><Bell size={18} /><i /></button><div className="topbar-divider" /><button className="topbar-user"><div className="user-avatar small">RA</div><ChevronDown size={15} /></button></div></header>
        <div className="page-content">
          {activePage === 'overview' ? <>
          <div className="page-heading"><div><p className="eyebrow">TERÇA-FEIRA, 28 DE OUTUBRO DE 2026</p><h1>Bom dia, Rafael</h1><p className="subtitle">Aqui está o resumo das oportunidades tributárias da sua operação.</p></div><button className="primary-button" onClick={() => setShowModal(true)}><Plus size={17} /> Nova análise</button></div>
          <div className="overview-grid"><MetricCard label="Economia identificada" value="R$ 842.160" detail="vs. mês anterior" trend="18,6%" icon={ArrowDownRight} /><MetricCard label="Comissão projetada" value="R$ 126.324" detail="15% sobre economia" trend="12,4%" icon={WalletCards} /><MetricCard label="Análises em andamento" value="28" detail="8 com alta prioridade" trend="4 novas" icon={FileSearch} /><MetricCard label="Clientes ativos" value="64" detail="12 novos este mês" trend="23,1%" icon={Store} /></div>
          <div className="section-header"><div><h2>Oportunidades tributárias</h2><p>Potencial de redução de juros e multas identificado nas bases analisadas.</p></div><div className="section-actions"><div className="select-wrap"><span>Período</span><select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Selecionar período"><option>Últimos 30 dias</option><option>Últimos 90 dias</option><option>Este ano</option></select><ChevronDown size={15} /></div><button className="filter-button"><SlidersHorizontal size={16} /> Filtros</button></div></div>
          <div className="chart-card"><div className="chart-header"><div><span className="card-label">Economia acumulada</span><div className="chart-number">R$ 842.160 <span className="chart-change"><ArrowUpRight size={14} /> 18,6%</span></div></div><div className="legend"><span><i className="legend-dot blue" />Economia gerada</span><span><i className="legend-dot gray" />Comissão</span></div></div><div className="chart"><div className="y-axis"><span>R$ 900k</span><span>R$ 600k</span><span>R$ 300k</span><span>R$ 0</span></div><div className="chart-area"><div className="grid-line one" /><div className="grid-line two" /><div className="grid-line three" /><div className="grid-line four" /><svg viewBox="0 0 720 220" preserveAspectRatio="none" role="img" aria-label="Gráfico de economia acumulada"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4d8fff" stopOpacity=".24" /><stop offset="100%" stopColor="#4d8fff" stopOpacity="0" /></linearGradient></defs><path d="M0 194 C43 188, 58 180, 96 184 S150 165, 192 168 S247 142, 288 149 S342 125, 383 132 S437 107, 480 113 S530 91, 575 96 S626 62, 671 69 S704 42, 720 33 L720 220 L0 220 Z" fill="url(#areaFill)" /><path d="M0 194 C43 188, 58 180, 96 184 S150 165, 192 168 S247 142, 288 149 S342 125, 383 132 S437 107, 480 113 S530 91, 575 96 S626 62, 671 69 S704 42, 720 33" fill="none" stroke="#4d8fff" strokeWidth="3" strokeLinecap="round" /></svg><div className="x-axis"><span>01 out</span><span>08 out</span><span>15 out</span><span>22 out</span><span>28 out</span></div></div></div></div>
          <div className="table-section"><div className="table-heading"><div><h2>Oportunidades recentes</h2><p>Últimas análises adicionadas à sua carteira.</p></div><button className="text-button">Ver todas <ArrowUpRight size={15} /></button></div><div className="tabs">{['Todas', 'Alta oportunidade', 'Em análise'].map((tab) => <button key={tab} className={activeTab === tab ? 'tab-active' : ''} onClick={() => setActiveTab(tab)}>{tab}{tab === 'Todas' && <span>12</span>}</button>)}</div><div className="table-wrap"><table><thead><tr><th>CLIENTE</th><th>TRIBUTO</th><th>VALOR ATUALIZADO</th><th>ECONOMIA POTENCIAL</th><th>STATUS</th><th /></tr></thead><tbody>{debts.filter((debt) => activeTab === 'Todas' || debt.status === activeTab).map((debt) => <tr key={debt.company}><td><div className="company-cell"><div className={`company-avatar ${debt.tone}`}>{debt.initials}</div><div><strong>{debt.company}</strong><small>{debt.cnpj}</small></div></div></td><td><span className="tax-type">{debt.type}</span></td><td><strong>{debt.updated}</strong><small>Original: {debt.original}</small></td><td><strong className="saving">{debt.saving}</strong><small>35,2% de redução</small></td><td><span className={`status ${debt.tone}`}><i />{debt.status}</span></td><td><button className="row-menu" aria-label={`Opções de ${debt.company}`}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></div>
          <footer className="disclaimer"><ShieldCheck size={16} /><span>As estimativas são baseadas nos documentos fornecidos e em fontes públicas. Toda análise deve ser validada por um profissional habilitado antes de qualquer decisão.</span></footer>
          </> : <WorkspacePage title={activePage === 'opportunities' ? 'Oportunidades' : activePage === 'clients' ? 'Clientes' : activePage === 'documents' ? 'Documentos fiscais' : activePage === 'commissions' ? 'Comissões' : activePage === 'simulator' ? 'Simulador tributário' : activePage === 'reports' ? 'Relatórios' : activePage === 'settings' ? 'Configurações' : 'Central de ajuda'} description="Acompanhe, organize e transforme dados fiscais em decisões mais seguras para seus clientes." kind={activePage as 'opportunities' | 'clients' | 'documents' | 'commissions' | 'simulator' | 'reports' | 'settings' | 'help'} />}
        </div>
      </section>
      {showModal && <div className="modal-backdrop" role="presentation" onClick={() => setShowModal(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><span className="modal-kicker">NOVA OPORTUNIDADE</span><h2 id="modal-title">Iniciar análise tributária</h2></div><button className="icon-button" onClick={() => setShowModal(false)} aria-label="Fechar"><X size={18} /></button></div><p>Adicione os dados básicos do cliente para estimar o potencial de redução de juros e multas.</p><label>Nome da empresa<input placeholder="Ex.: Mercado Boa Compra Ltda." /></label><label>CNPJ<input placeholder="00.000.000/0000-00" /></label><div className="modal-actions"><button className="secondary-button" onClick={() => setShowModal(false)}>Cancelar</button><button className="primary-button" onClick={() => setShowModal(false)}>Continuar <ArrowUpRight size={15} /></button></div></div></div>}
    </main>
  )
}
