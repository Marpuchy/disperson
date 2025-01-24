document.addEventListener("DOMContentLoaded", () => {
    const statsDescriptions = {
        experiencia: {
            positive: "Eres una persona profundamente creativa y abierta a nuevas experiencias. Te encanta explorar lo desconocido, descubrir perspectivas frescas y sumergirte en ideas innovadoras. Tu curiosidad natural te lleva a probar cosas nuevas, ya sea aprendiendo habilidades, viajando a lugares únicos o participando en actividades poco convencionales. Las personas con una alta apertura como tú suelen ser vistas como visionarias, siempre dispuestas a experimentar el mundo con entusiasmo y asombro.",
            negative: "Prefieres mantenerte en entornos familiares y tradicionales, encontrando seguridad y estabilidad en lo que ya conoces. Te sientes más cómodo(a) con rutinas bien establecidas y puedes ser menos propenso(a) a disfrutar de cambios abruptos o ideas abstractas. No te atrae tanto la incertidumbre o lo desconocido, y prefieres trabajar con métodos probados y confiables que garantizan resultados previsibles."
        },
        responsabilidad: {
            positive: "Te destacas como una persona extremadamente organizada y confiable. Tiendes a planificar cuidadosamente tus actividades y a establecer metas claras que cumples con determinación. Tienes un fuerte sentido de compromiso y te esfuerzas por cumplir tus promesas, lo que hace que los demás confíen plenamente en ti. Tu dedicación y enfoque te convierten en alguien ideal para liderar proyectos importantes, manejar tareas complejas y superar desafíos con persistencia.",
            negative: "Tiendes a adoptar un enfoque más relajado y espontáneo hacia la vida. Prefieres la flexibilidad en lugar de seguir un horario estricto, lo que te permite adaptarte fácilmente a cambios inesperados. Disfrutas de la improvisación y a menudo encuentras soluciones creativas en situaciones no planificadas. Aunque no siempre sigues un plan estructurado, esto no significa que carezcas de compromiso, sino que valoras la libertad y la capacidad de vivir el momento."
        },
        extraversion: {
            positive: "Disfrutas profundamente de las interacciones sociales y te sientes energizado(a) en entornos dinámicos y llenos de gente. Eres la persona que ilumina una habitación con tu energía y entusiasmo, y no tienes problemas para tomar la iniciativa en conversaciones o actividades grupales. Tu naturaleza extrovertida te lleva a buscar conexiones significativas y a destacar en situaciones que requieren liderazgo o carisma.",
            negative: "Te sientes más cómodo(a) en ambientes tranquilos y disfrutas de momentos de soledad o compañía íntima. Prefieres la reflexión personal a los eventos ruidosos y encuentras paz en actividades que no requieren constante interacción social. Aunque no buscas activamente grandes grupos o multitudes, valoras las relaciones profundas y significativas con quienes están cerca de ti."
        },
        amabilidad: {
            positive: "Eres una persona profundamente empática que se preocupa por el bienestar de los demás. Tu disposición amable te lleva a buscar la armonía en tus relaciones, y a menudo sirves como mediador(a) en conflictos. Disfrutas ayudando a otros y haciendo lo posible para que las personas se sientan valoradas y respetadas. Tu naturaleza compasiva te convierte en un gran aliado(a) en equipos y un amigo(a) confiable en cualquier situación.",
            negative: "Tiendes a ser directo(a) y competitivo(a), priorizando la claridad y la eficacia sobre mantener la paz. A veces prefieres expresar tus ideas y opiniones sin preocuparte demasiado por las emociones de los demás, lo que puede llevar a una comunicación más honesta, aunque menos diplomática. Valoras la autenticidad y no tienes miedo de desafiar el status quo si crees que es lo correcto."
        },
        emocional: {
            positive: "Tu alta estabilidad emocional demuestra que eres una persona resiliente y capaz de manejar eficazmente situaciones de estrés o presión. Mantienes la calma incluso en momentos difíciles y rara vez permites que las emociones negativas nublen tu juicio. Esta fortaleza interior te ayuda a superar desafíos con confianza y a brindar apoyo emocional a quienes te rodean cuando más lo necesitan.",
            negative: "Tiendes a ser más sensible a los altibajos emocionales, lo que puede hacer que experimentes momentos intensos de ansiedad, estrés o vulnerabilidad. Sin embargo, esta sensibilidad también te permite conectarte profundamente con tus emociones y con las de los demás. Aunque puedes sentirte desbordado(a) en ciertas situaciones, esta característica te hace más consciente de tus propios sentimientos y te da la oportunidad de crecer a través de la autorreflexión."
        },
    };

    Object.keys(window.userStats).forEach(stat => {
        const value = window.userStats[stat];
        const description = value > 50
            ? statsDescriptions[stat].positive
            : statsDescriptions[stat].negative;

        const descriptionContainer = document.querySelector(`#description${stat.charAt(0).toUpperCase() + stat.slice(1)}`);
        if (descriptionContainer) {
            descriptionContainer.textContent = description;
        }
    });
});
