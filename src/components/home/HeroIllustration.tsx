export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 480"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Ilustração de profissional de segurança do trabalho em ambiente industrial"
    >
      <circle cx="300" cy="240" r="220" fill="#0f3d24" opacity="0.06" />
      <circle cx="300" cy="240" r="170" fill="#e0a815" opacity="0.08" />

      {/* Fábrica ao fundo */}
      <g opacity="0.9">
        <rect x="60" y="230" width="120" height="150" fill="#0f3d24" />
        <rect x="60" y="180" width="18" height="60" fill="#0f3d24" />
        <rect x="150" y="160" width="18" height="80" fill="#0f3d24" />
        <rect x="90" y="260" width="24" height="28" fill="#f2c230" opacity="0.85" />
        <rect x="130" y="260" width="24" height="28" fill="#f2c230" opacity="0.85" />
        <rect x="90" y="310" width="24" height="28" fill="#f2c230" opacity="0.6" />
        <rect x="130" y="310" width="24" height="28" fill="#f2c230" opacity="0.6" />

        <rect x="400" y="200" width="110" height="180" fill="#145c34" />
        <rect x="430" y="230" width="22" height="26" fill="#f2c230" opacity="0.7" />
        <rect x="470" y="230" width="22" height="26" fill="#f2c230" opacity="0.7" />
        <rect x="430" y="275" width="22" height="26" fill="#f2c230" opacity="0.5" />
        <rect x="470" y="275" width="22" height="26" fill="#f2c230" opacity="0.5" />
      </g>

      {/* Chão */}
      <rect x="0" y="380" width="560" height="6" fill="#14140f" opacity="0.12" />

      {/* Engrenagens (tecnologia/IA) */}
      <g fill="none" stroke="#1c7a45" strokeWidth="6" opacity="0.5">
        <circle cx="470" cy="120" r="28" />
        <circle cx="470" cy="120" r="10" fill="#1c7a45" stroke="none" />
      </g>
      <g fill="none" stroke="#e0a815" strokeWidth="5" opacity="0.6">
        <circle cx="505" cy="80" r="18" />
        <circle cx="505" cy="80" r="6" fill="#e0a815" stroke="none" />
      </g>

      {/* Profissional de SST */}
      <g>
        {/* sombra */}
        <ellipse cx="280" cy="382" rx="70" ry="12" fill="#14140f" opacity="0.12" />

        {/* pernas */}
        <rect x="250" y="300" width="24" height="80" rx="8" fill="#14140f" />
        <rect x="290" y="300" width="24" height="80" rx="8" fill="#14140f" />

        {/* tronco / colete */}
        <rect x="235" y="205" width="110" height="105" rx="18" fill="#1c7a45" />

        {/* faixas refletivas do colete */}
        <rect x="235" y="235" width="110" height="12" fill="#f2c230" />
        <rect x="235" y="270" width="110" height="12" fill="#f2c230" />

        {/* braços */}
        <rect x="205" y="215" width="26" height="80" rx="13" fill="#145c34" />
        <rect x="349" y="215" width="26" height="80" rx="13" fill="#145c34" />

        {/* mão segurando prancheta */}
        <rect x="352" y="230" width="46" height="60" rx="6" fill="#ffffff" stroke="#14140f" strokeWidth="3" />
        <rect x="360" y="242" width="30" height="6" fill="#14140f" opacity="0.5" />
        <rect x="360" y="254" width="30" height="6" fill="#14140f" opacity="0.5" />
        <rect x="360" y="266" width="18" height="6" fill="#1c7a45" />

        {/* cabeça */}
        <circle cx="290" cy="175" r="34" fill="#e7b98c" />

        {/* capacete */}
        <path d="M254 168 a36 30 0 0 1 72 0 z" fill="#e0a815" />
        <rect x="250" y="164" width="80" height="12" rx="6" fill="#f2c230" />
      </g>

      {/* Escudo de segurança flutuante */}
      <g transform="translate(140,120)">
        <path
          d="M30 0 L58 12 V34 C58 54 46 68 30 76 C14 68 2 54 2 34 V12 Z"
          fill="#ffffff"
          stroke="#1c7a45"
          strokeWidth="4"
        />
        <path
          d="M18 38 L27 47 L44 26"
          fill="none"
          stroke="#1c7a45"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* pontos decorativos de "dados/IA" */}
      <g fill="#e0a815">
        <circle cx="120" cy="80" r="5" opacity="0.8" />
        <circle cx="150" cy="60" r="4" opacity="0.6" />
        <circle cx="410" cy="130" r="4" opacity="0.6" />
      </g>
      <g fill="#1c7a45">
        <circle cx="500" cy="300" r="6" opacity="0.4" />
        <circle cx="60" cy="150" r="4" opacity="0.4" />
      </g>
    </svg>
  );
}
