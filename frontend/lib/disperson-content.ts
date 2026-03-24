export const traitCards = [
  {
    letter: "O",
    title: "Apertura a la experiencia",
    summary: "Curiosidad, imaginacion y ganas de explorar ideas, estimulos y lecturas nuevas del mundo.",
    lowAnchor: "Mas conocido",
    highAnchor: "Mas exploracion"
  },
  {
    letter: "C",
    title: "Responsabilidad",
    summary: "Orden, constancia y capacidad para sostener habitos o compromisos con continuidad.",
    lowAnchor: "Mas improvisacion",
    highAnchor: "Mas estructura"
  },
  {
    letter: "E",
    title: "Extraversión",
    summary: "Energia social, iniciativa y preferencia por entornos activos o con mayor estimulacion.",
    lowAnchor: "Mas reserva",
    highAnchor: "Mas energia"
  },
  {
    letter: "A",
    title: "Amabilidad",
    summary: "Empatia, cooperacion y forma de relacionarte con otras personas en el dia a dia.",
    lowAnchor: "Mas friccion",
    highAnchor: "Mas cooperacion"
  },
  {
    letter: "N",
    title: "Estabilidad emocional",
    summary: "Regulacion emocional y respuesta habitual ante la presion, la incertidumbre o el cambio.",
    lowAnchor: "Mas reactividad",
    highAnchor: "Mas calma"
  }
] as const;

export const heroSignals = [
  "Big Five en el centro",
  "Lectura interpretativa clara",
  "Perfil visual memorable"
] as const;

export const journeyCards = [
  {
    title: "Responde con naturalidad",
    text: "Cada bloque te invita a reaccionar ante situaciones cotidianas para captar como sueles pensar, sentir y actuar."
  },
  {
    title: "Observa tu mapa de rasgos",
    text: "La lectura transforma tus respuestas en un retrato OCEAN facil de entender, con matices y equilibrio entre dimensiones."
  },
  {
    title: "Reconoce tu reflejo visual",
    text: "El perfil final une interpretacion psicologica y una asociacion visual para que la experiencia deje una huella mas emocional."
  }
] as const;

export const projectPillars = [
  {
    eyebrow: "Base psicologica",
    title: "OCEAN sigue siendo el nucleo de toda la experiencia.",
    text: "La capa visual hace mas recordable el resultado, pero no reemplaza el modelo ni el sentido interpretativo de la experiencia."
  },
  {
    eyebrow: "Narrativa visual",
    title: "El personaje aparece como recompensa, no como maquillaje.",
    text: "Se ve pronto, se entiende rapido y convierte el perfil en algo mas facil de recordar y compartir."
  },
  {
    eyebrow: "Contexto UJI",
    title: "La narrativa se apoya en una base academica real.",
    text: "Disperson comunica una lectura honesta, accesible y atractiva del Big Five sin venderlo como diagnostico clinico."
  }
] as const;

export const characterPanels = [
  {
    image: "/resources/characters/24.jpg",
    eyebrow: "Resultado principal",
    title: "Un retrato visual para el rasgo que mas define tu perfil.",
    text: "La primera escena condensa el tono de tu perfil para que puedas reconocerlo de un vistazo."
  },
  {
    image: "/resources/characters/7.jpg",
    eyebrow: "Memoria del perfil",
    title: "Asociaciones faciles de recordar",
    text: "La capa Disney funciona como un ancla emocional para volver a la lectura desde una imagen familiar."
  },
  {
    image: "/resources/characters/20.jpg",
    eyebrow: "Banco visual",
    title: "Mas de un resultado posible",
    text: "Cada combinacion de rasgos abre una forma distinta de verse reflejado en la experiencia."
  }
] as const;

export const contactCards = [
  {
    title: "Entrar en tu espacio",
    text: "Accede a una experiencia personal para comenzar o retomar tu lectura de rasgos.",
    href: "/login",
    label: "Entrar"
  },
  {
    title: "Cuestionario Big Five",
    text: "Responde el cuestionario y descubre como se distribuyen tus cinco dimensiones de personalidad.",
    href: "/quiz/start",
    label: "Abrir test"
  },
  {
    title: "Conocer el enfoque",
    text: "Explora la idea que une autoconocimiento, interpretacion y una capa visual inspirada en personajes.",
    href: "/about",
    label: "Saber mas"
  }
] as const;
