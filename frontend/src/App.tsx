import { useState, useMemo } from 'react';
import { Search, Heart, Car, Bike, MapPin, Calendar, Gauge, MessageCircle, Share2, GitCompare, Bell, ChevronLeft, ChevronRight, X, Phone } from 'lucide-react';
import type { Veiculo } from './types';
import { MOCK_VEHICLES } from './data/mockVehicles';
import './styles/store.css'; 

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};

const VehicleCard = ({ v, onSelect }: { v: Veiculo, onSelect: (v: Veiculo) => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const fotos = v.fotos && v.fotos.length > 0 ? v.fotos : ['https://via.placeholder.com/400x300?text=Sem+Foto'];

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  return (
    <div className="v-card" onClick={() => onSelect(v)}>
      <div className="v-card-img">
        {v.preco < 100000 && <span className="v-badge-fipe">Abaixo da FIPE</span>}
        <button className="v-heart" onClick={(e) => { e.stopPropagation(); alert('Favoritado!'); }}><Heart size={18} /></button>
        <span className="v-img-count">{currentIdx + 1}/{fotos.length}</span>
        
        {fotos.length > 1 && (
          <>
            <button className="carousel-nav prev" onClick={prevImg} aria-label="Foto anterior">
              <ChevronLeft size={16} />
            </button>
            <button className="carousel-nav next" onClick={nextImg} aria-label="Próxima foto">
              <ChevronRight size={16} />
            </button>
            <div className="carousel-dots card-dots">
              {fotos.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${idx === currentIdx ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                  aria-label={`Foto ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <img src={fotos[currentIdx]} alt={`${v.marca} ${v.modelo}`} />
      </div>

      <div className="v-card-content">
        <h3 className="v-title">{v.marca} {v.modelo}</h3>
        
        <div className="v-specs">
          <div className="v-spec-item">
            {v.tipoVeiculo === 'CARRO' ? <Car size={14} /> : <Bike size={14} />} 
            <span style={{textTransform: 'capitalize'}}>{v.tipoVeiculo.toLowerCase()}</span>
          </div>
          <div className="v-spec-item"><Calendar size={14} /> {v.ano}/{v.ano}</div>
          <div className="v-spec-item"><Gauge size={14} /> {v.km.toLocaleString('pt-BR')} km</div>
        </div>

        <div className="v-location">
          <div className="v-loc-badge"><MapPin size={12} /> No pátio</div>
          <div className="v-loc-text"><MapPin size={12} /> recife/PE</div>
        </div>

        <div className="v-price">{formatCurrency(v.preco)}</div>

        <div className="v-actions">
          <button className="btn-primary" onClick={(e) => { e.stopPropagation(); onSelect(v); }}>Ver oferta</button>
          <button className="btn-outline" onClick={(e) => e.stopPropagation()}><GitCompare size={14} /> Comparar</button>
          <button className="btn-icon" onClick={(e) => e.stopPropagation()}><MessageCircle size={18} /></button>
          <button className="btn-icon blue" onClick={(e) => e.stopPropagation()}><Share2 size={18} /></button>
        </div>
      </div>
    </div>
  );
};

const VehicleModal = ({ v, onClose }: { v: Veiculo, onClose: () => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const fotos = v.fotos && v.fotos.length > 0 ? v.fotos : ['https://via.placeholder.com/400x300?text=Sem+Foto'];

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-gallery">
          {fotos.length > 1 && (
            <>
              <button className="carousel-nav prev" onClick={prevImg} aria-label="Foto anterior">
                <ChevronLeft size={24} />
              </button>
              <button className="carousel-nav next" onClick={nextImg} aria-label="Próxima foto">
                <ChevronRight size={24} />
              </button>
              <div className="carousel-dots">
                {fotos.map((_, idx) => (
                  <button
                    key={idx}
                    className={`carousel-dot ${idx === currentIdx ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                    aria-label={`Foto ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          <img src={fotos[currentIdx]} alt={`${v.marca} ${v.modelo}`} />
          <span className="v-img-count" style={{ zIndex: 10 }}>{currentIdx + 1}/{fotos.length}</span>
        </div>

        <div className="modal-info">
          <h2>{v.marca} {v.modelo}</h2>
          <div className="v-location" style={{ marginBottom: '20px' }}>
            <div className="v-loc-badge"><MapPin size={12} /> Em estoque</div>
            <div className="v-loc-text">recife/PE</div>
          </div>
          
          <div className="price">{formatCurrency(v.preco)}</div>

          <div className="modal-details-grid">
            <div className="modal-detail-box">
              <span>Ano</span>
              <strong>{v.ano}</strong>
            </div>
            <div className="modal-detail-box">
              <span>Quilometragem</span>
              <strong>{v.km.toLocaleString('pt-BR')} km</strong>
            </div>
            <div className="modal-detail-box">
              <span>Câmbio</span>
              <strong>Automático</strong>
            </div>
            <div className="modal-detail-box">
              <span>Cor</span>
              <strong>{v.cor}</strong>
            </div>
            <div className="modal-detail-box">
              <span>Final da Placa</span>
              <strong>{v.finalPlaca || (v.placa ? v.placa.slice(-1) : '-')}</strong>
            </div>
            <div className="modal-detail-box">
              <span>Combustível</span>
              <strong style={{textTransform: 'capitalize'}}>{v.propulsao.toLowerCase()}</strong>
            </div>
          </div>

          <div className="modal-desc">
            <p>Veículo em excelente estado de conservação, vistoriado e com garantia Esquina Veículos.</p>
            {v.temLeilao && (
              <p style={{ color: '#d32f2f', marginTop: '10px', fontWeight: 600 }}>
                Aviso: Este veículo possui histórico de {v.origemLeilao?.replace('_', ' ').toLowerCase()}.
              </p>
            )}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', gap: '15px' }}>
            <button className="btn-primary" style={{ padding: '15px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={20} /> Falar no WhatsApp
            </button>
            <button className="btn-outline" style={{ padding: '15px' }}>
              <Phone size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeType, setActiveType] = useState<'CARRO' | 'MOTO'>('CARRO');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [precoMaximo, setPrecoMaximo] = useState(500000);
  const [selectedVehicle, setSelectedVehicle] = useState<Veiculo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Filtragem dos veículos
  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter(v => {
      // Filtro principal: Carro ou Moto
      if (v.tipoVeiculo !== activeType) return false;
      
      // Filtro Sidebar: Marca e Modelo
      if (marca && !v.marca.toLowerCase().includes(marca.toLowerCase().trim())) return false;
      if (modelo && !v.modelo.toLowerCase().includes(modelo.toLowerCase().trim())) return false;
      
      // Filtro Sidebar: Preço Máximo
      if (v.preco > precoMaximo) return false;

      // Filtro Superior (Busca Global)
      if (searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const matchSearch = 
          v.marca.toLowerCase().includes(term) || 
          v.modelo.toLowerCase().includes(term) || 
          (v.finalPlaca && term.includes(v.finalPlaca)) ||
          (v.placaMascarada && v.placaMascarada.toLowerCase().includes(term));
        if (!matchSearch) return false;
      }

      return true;
    });
  }, [activeType, marca, modelo, precoMaximo, searchTerm]);

  // Lista de marcas disponíveis para sugestão no input
  const availableBrands = useMemo(() => {
    return Array.from(new Set(MOCK_VEHICLES.filter(v => v.tipoVeiculo === activeType).map(v => v.marca))).sort();
  }, [activeType]);

  // Paginação
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVehicles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  const goToPage = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {selectedVehicle && (
        <VehicleModal v={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}

      <nav className="navbar">
        <a href="/" className="nav-brand">
          <Car color="#f26522" size={28} /> Esquina Veículos
        </a>
        
        <div className="nav-links">
          <a href="#comprar">Comprar</a>
          <a href="#vender">Vender</a>
          <a href="#financiar">Financiar</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#servicos">Serviços</a>
        </div>

        <div className="nav-search">
          <Search size={18} color="#757575" />
          <input 
            type="text" 
            placeholder="Busque por marca, modelo ou placa" 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="nav-actions">
          <button title="Favoritos"><Heart size={22} /></button>
          <button title="Notificações"><Bell size={22} /></button>
        </div>
      </nav>

      <main className="layout-container">
        <aside className="sidebar">
          <div className="type-toggle">
            <button 
              className={activeType === 'CARRO' ? 'active' : ''} 
              onClick={() => { setActiveType('CARRO'); setCurrentPage(1); }}
            >
              <Car size={18} /> Carros
            </button>
            <button 
              className={activeType === 'MOTO' ? 'active' : ''} 
              onClick={() => { setActiveType('MOTO'); setCurrentPage(1); }}
            >
              <Bike size={18} /> Motos
            </button>
          </div>

          <div className="sidebar-header">
            <h3><Gauge size={18} color="#f26522" /> FILTROS</h3>
            <button onClick={() => { setMarca(''); setModelo(''); setSearchTerm(''); setPrecoMaximo(500000); setCurrentPage(1); }}>
              Limpar
            </button>
          </div>

          <div className="filter-group">
            <label>Marca</label>
            <input 
              type="text" 
              list="marcas-sugestoes"
              placeholder="Ex: Toyota, Honda, Jeep..." 
              value={marca}
              onChange={e => { setMarca(e.target.value); setCurrentPage(1); }}
            />
            <datalist id="marcas-sugestoes">
              {availableBrands.map(b => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </div>

          <div className="filter-group">
            <label>Modelo</label>
            <input 
              type="text" 
              placeholder="Ex: Civic, Corolla, Tracker..." 
              value={modelo}
              onChange={e => { setModelo(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="filter-group">
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              Faixa de Preço <span style={{ color: '#f26522', fontWeight: 600 }}>{precoMaximo >= 500000 ? 'Qualquer' : `Até R$ ${(precoMaximo/1000).toFixed(0)} mil`}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="500000" 
              step="5000"
              value={precoMaximo}
              onChange={(e) => { setPrecoMaximo(Number(e.target.value)); setCurrentPage(1); }}
              style={{ width: '100%', margin: '15px 0 5px 0', accentColor: '#f26522', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#757575' }}>
              <span>R$ 0</span>
              <span>R$ 500 mil</span>
            </div>
          </div>
        </aside>

        <section className="vehicle-grid">
          <div className="catalog-header">
            <div className="catalog-count">
              Mostrando <strong>{paginatedVehicles.length}</strong> de <strong>{filteredVehicles.length}</strong> veículos encontrados
            </div>
            {totalPages > 1 && (
              <div style={{ fontSize: '0.85rem', color: '#757575' }}>
                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
              </div>
            )}
          </div>

          {paginatedVehicles.map(v => (
            <VehicleCard key={v.id || v.placaMascarada || v.placa} v={v} onSelect={setSelectedVehicle} />
          ))}

          {filteredVehicles.length === 0 && (
            <div style={{ padding: '3rem', color: '#757575', gridColumn: '1 / -1', textAlign: 'center' }}>
              Nenhum veículo encontrado com os filtros aplicados.
            </div>
          )}

          {totalPages > 1 && (
            <div className="catalog-pagination">
              <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                &lt; Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`page-btn ${currentPage === p ? 'active' : ''}`}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </button>
              ))}
              <button 
                className="page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Próxima &gt;
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
