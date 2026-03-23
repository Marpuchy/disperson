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
  "Preguntas dinamicas desde BD",
  "Perfil visual persistido"
] as const;

export const journeyCards = [
  {
    title: "Banco de preguntas real",
    text: "Doctrine recupera preguntas editables en base de datos para que el test no dependa de arrays estaticos."
  },
  {
    title: "Scoring fiel al proyecto",
    text: "Las respuestas se traducen a una escala 0-100 con inversion de items, clamp y persistencia por usuario."
  },
  {
    title: "Resultado memorable",
    text: "El perfil combina interpretacion psicologica, radar y personajes como capa emocional del resultado."
  }
] as const;

export const projectPillars = [
  {
    eyebrow: "Base psicologica",
    title: "OCEAN sigue siendo el nucleo de toda la experiencia.",
    text: "La capa visual hace mas recordable el resultado, pero no reemplaza el modelo ni el sentido interpretativo del proyecto."
  },
  {
    eyebrow: "Narrativa visual",
    title: "El personaje aparece como recompensa, no como maquillaje.",
    text: "Se ve pronto, se entiende rapido y convierte el perfil en algo mas facil de recordar y compartir."
  },
  {
    eyebrow: "Contexto UJI",
    title: "La narrativa se apoya en el trabajo original del proyecto.",
    text: "Disperson comunica una lectura honesta, accesible y atractiva del Big Five sin venderlo como diagnostico clinico."
  }
] as const;

export const characterPanels = [
  {
    image: "/resources/characters/24.jpg",
    eyebrow: "Resultado principal",
    title: "Un retrato visual para el rasgo que mas define tu perfil.",
    text: "La primera lectura mezcla puntuacion, nivel y personaje asociado en una sola escena."
  },
  {
    image: "/resources/characters/7.jpg",
    eyebrow: "Memoria del perfil",
    title: "Asociaciones faciles de recordar",
    text: "La capa Disney funciona como atajo visual para volver a una lectura mas emocional del resultado."
  },
  {
    image: "/resources/characters/20.jpg",
    eyebrow: "Banco visual",
    title: "Mas de un resultado posible",
    text: "Cada combinacion de rasgo y nivel puede apuntar a un personaje diferente dentro del sistema."
  }
] as const;

export const contactCards = [
  {
    title: "Flujo real de la app",
    text: "Accede a login, cuestionario y perfil final servidos por Symfony con persistencia real.",
    href: "/login",
    label: "Entrar"
  },
  {
    title: "Cuestionario Big Five",
    text: "Abre el test OCEAN conectado a la base de datos y recorre la experiencia completa.",
    href: "/quiz/start",
    label: "Abrir test"
  },
  {
    title: "Gestion de contenido",
    text: "Revisa preguntas y personajes desde el area admin para mantener vivo el banco del proyecto.",
    href: "/admin",
    label: "Abrir admin"
  }
] as const;
