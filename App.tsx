import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type Tab = 'Inicio' | 'Descargas' | 'Perfil';
type Title = { title: string; type: string; image: string };

const catalog: Title[] = [
  { title: 'Stranger Things', type: 'Serie  •  4 temporadas', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=85' },
  { title: 'El agente nocturno', type: 'Serie  •  Suspenso', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=85' },
  { title: 'Dune: Parte dos', type: 'Película  •  2024', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=85' },
  { title: 'Miércoles', type: 'Serie  •  Comedia oscura', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=85' },
  { title: 'La sociedad de la nieve', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=85' },
  { title: 'Arcane', type: 'Serie  •  Animación', image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=85' },
  { title: 'El problema de los 3 cuerpos', type: 'Serie  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=85' },
  { title: 'Glass Onion', type: 'Película  •  Misterio', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=85' },
  { title: 'El hoyo', type: 'Película  •  Suspenso', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=85' },
  { title: 'Enola Holmes', type: 'Película  •  Aventura', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=85' },
  { title: 'Bird Box: A ciegas', type: 'Película  •  Thriller', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=85' },
  { title: 'No mires arriba', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=600&q=85' },
  { title: 'El rey', type: 'Película  •  Drama histórico', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=600&q=85' },
  { title: 'El ejército de los muertos', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=85' },
  { title: 'Proyecto Power', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=600&q=85' },
  { title: 'Tirador', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=600&q=85' },
  { title: 'Hustle', type: 'Película  •  Deporte', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=85' },
  { title: 'El teléfono negro', type: 'Película  •  Terror', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=85' },
  { title: 'Maestro', type: 'Película  •  Biografía', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=85' },
  { title: 'La vieja guardia', type: 'Película  •  Fantasía', image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600&q=85' },
  { title: 'A través de mi ventana', type: 'Película  •  Romance', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=600&q=85' },
  { title: 'Nimona', type: 'Película  •  Animación', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85' },
  { title: 'El mundo perdido', type: 'Película  •  Aventura', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=85' },
  { title: 'Código 8', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=85' },
  { title: 'La conferencia', type: 'Película  •  Terror', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=85' },
  { title: 'Pájaros de fuego', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=85' },
  { title: 'Misión de rescate 2', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=600&q=85' },
  { title: 'El hombre gris', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=85' },
  { title: 'El proyecto Adam', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=85' },
  { title: 'Atlas', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=600&q=85' },
  { title: 'Historia de un matrimonio', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=85' },
  { title: 'El juicio de los 7 de Chicago', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=85' },
  { title: 'Familia al instante', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=85' },
  { title: 'Alerta roja', type: 'Película  •  Aventura', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=85' },
  { title: 'Misión de rescate', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=600&q=85' },
  { title: '6 en la sombra', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=85' },
  { title: 'Los justos', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=85' },
  { title: 'Bright', type: 'Película  •  Fantasía', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=85' },
  { title: 'Oxígeno', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=85' },
  { title: 'Invasión: el fin de los tiempos', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=85' },
  { title: 'El irlandés', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=600&q=85' },
  { title: 'El asesino', type: 'Película  •  Misterio', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=85' },
  { title: 'La maravilla', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=600&q=85' },
  { title: 'Los Mitchell contra las máquinas', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85' },
  { title: 'Hoy sí', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=85' },
  { title: 'Festival de la canción', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=85' },
  { title: 'Furiosa: de la saga Mad Max', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=85' },
  { title: 'Ambulance', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=600&q=85' },
  { title: 'El justiciero', type: 'Película  •  Acción', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=85' },
  { title: 'Spaceman', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=85' },
  { title: 'La paradoja de Cloverfield', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&w=600&q=85' },
  { title: 'Pasajeros', type: 'Película  •  Ciencia ficción', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=85&movie=passengers' },
  { title: 'Nyad', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=600&q=85' },
  { title: 'Rustin', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=85&movie=rustin' },
  { title: 'Los nadadores', type: 'Película  •  Drama', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=600&q=85' },
  { title: 'No estás invitada a mi bat mitzvá', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=85' },
  { title: 'Los forajidos', type: 'Película  •  Comedia', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=85&movie=outlaws' },
  { title: 'Tu casa o la mía', type: 'Película  •  Romance', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=85' },
];

const continueWatching = [
  { title: 'The Last Horizon', episode: 'T2:E4  •  32 min restantes', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=85' },
  { title: 'Dark', episode: 'T1:E7  •  18 min restantes', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=85' },
  { title: 'One Piece', episode: 'T1:E5  •  41 min restantes', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=85' },
  { title: 'Bridgerton', episode: 'T3:E2  •  26 min restantes', image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=85' },
  { title: 'El problema de los 3 cuerpos', episode: 'T1:E4  •  37 min restantes', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=85&watch=threebody' },
  { title: 'La casa de papel', episode: 'T5:E3  •  44 min restantes', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=85&watch=money' },
  { title: 'El agente nocturno', episode: 'T2:E1  •  29 min restantes', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=85' },
  { title: 'Miércoles', episode: 'T1:E6  •  21 min restantes', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=85&watch=wednesday' },
];

const featuredMovies = [catalog[2], catalog[7], catalog[14], catalog[26], catalog[40]];

const profileSections = ['Descripción general', 'Membresía', 'Seguridad', 'Dispositivos', 'Perfiles'];
const accountOptions = [
  ['Cambiar de plan', 'Elige el plan Ceflix que mejor se adapte a ti.'],
  ['Agregar forma de pago', 'Administra tus métodos de pago.'],
  ['Adquirir un cupo de miembro extra', 'Comparte Ceflix con alguien que no viva contigo.'],
  ['Administrar acceso y dispositivos', 'Revisa dónde está iniciada tu sesión.'],
  ['Actualizar contraseña', 'Mantén tu cuenta protegida.'],
  ['Transferir un perfil', 'Conserva tus recomendaciones y preferencias.'],
  ['Ajustar controles parentales', 'Controla el contenido disponible en tu cuenta.'],
  ['Editar configuración', 'Idioma, subtítulos, reproducción automática y más.'],
];

const movieRows = [
  { title: 'Películas de acción', items: [catalog[13], catalog[15], catalog[16], catalog[26], catalog[27], catalog[34], catalog[35], catalog[36], catalog[46], catalog[47], catalog[48]] },
  { title: 'Ciencia ficción y fantasía', items: [catalog[2], catalog[14], catalog[19], catalog[21], catalog[23], catalog[28], catalog[29], catalog[37], catalog[38], catalog[39], catalog[49], catalog[50], catalog[51]] },
  { title: 'Drama y misterio', items: [catalog[4], catalog[7], catalog[12], catalog[17], catalog[18], catalog[24], catalog[25], catalog[30], catalog[31], catalog[40], catalog[41], catalog[42], catalog[52], catalog[53], catalog[54]] },
  { title: 'Comedia y aventura', items: [catalog[8], catalog[9], catalog[11], catalog[20], catalog[22], catalog[32], catalog[33], catalog[43], catalog[44], catalog[45], catalog[55], catalog[56], catalog[57]] },
];

const seriesCatalog: Title[] = [
  { title: 'The Rookie', type: 'Serie  •  Drama policial', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=85&series=rookie' },
  { title: 'Policías de Chicago', type: 'Serie  •  Acción', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=85&series=chicago' },
  { title: 'Bones', type: 'Serie  •  Misterio', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=85' },
  { title: 'Rick y Morty', type: 'Serie  •  Animación', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85&series=rick' },
  { title: 'El joven Sheldon', type: 'Serie  •  Comedia', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=85' },
  { title: 'Titanes', type: 'Serie  •  Fantasía', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=85&series=titans' },
  { title: 'Merlina', type: 'Serie  •  Comedia oscura', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=85&series=merlina' },
  { title: 'La ley y el orden', type: 'Serie  •  Crimen', image: 'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&w=600&q=85' },
  { title: 'La casa de papel', type: 'Serie  •  Suspenso', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=85&series=money' },
  { title: 'The Witcher', type: 'Serie  •  Fantasía', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=85&series=witcher' },
  { title: 'Bridgerton', type: 'Serie  •  Romance', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85&series=bridgerton' },
  { title: 'Lupin', type: 'Serie  •  Misterio', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=85&series=lupin' },
  { title: 'Cobra Kai', type: 'Serie  •  Acción', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=85&series=cobra' },
  { title: 'The Crown', type: 'Serie  •  Drama histórico', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=85&series=crown' },
];

const childrenCatalog: Title[] = [
  { title: 'Klaus', type: 'Infantil  •  Animación', image: 'https://images.unsplash.com/photo-1542779283-429940ce8336?auto=format&fit=crop&w=600&q=85' },
  { title: 'Más allá de la Luna', type: 'Infantil  •  Aventura', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85&kids=moon' },
  { title: 'Leo', type: 'Infantil  •  Comedia', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=85' },
  { title: 'Pinocho de Guillermo del Toro', type: 'Infantil  •  Fantasía', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=85&kids=pinocchio' },
  { title: 'Matilda', type: 'Infantil  •  Musical', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=85' },
  { title: 'Vivo', type: 'Infantil  •  Musical', image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=600&q=85' },
  { title: 'El dragón de los deseos', type: 'Infantil  •  Fantasía', image: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=600&q=85' },
  { title: 'Paddington', type: 'Infantil  •  Aventura', image: 'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?auto=format&fit=crop&w=600&q=85' },
  { title: 'El monstruo marino', type: 'Infantil  •  Aventura', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=85' },
  { title: 'La familia Addams', type: 'Infantil  •  Comedia', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=85&kids=addams' },
  { title: 'Hotel Transylvania', type: 'Infantil  •  Comedia', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=85&kids=hotel' },
  { title: 'El increíble castillo vagabundo', type: 'Infantil  •  Fantasía', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=85&kids=castle' },
  { title: 'Trolls', type: 'Infantil  •  Musical', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=85&kids=trolls' },
  { title: 'La patrulla canina', type: 'Infantil  •  Aventura', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85&kids=paw' },
];

const downloadedMovies = [
  { ...catalog[2], size: '2.4 GB', quality: '4K UHD' },
  { ...catalog[26], size: '1.8 GB', quality: 'Full HD' },
  { ...catalog[40], size: '1.2 GB', quality: 'Full HD' },
  { ...childrenCatalog[0], size: '860 MB', quality: 'HD' },
  { ...childrenCatalog[8], size: '740 MB', quality: 'HD' },
  { ...childrenCatalog[10], size: '920 MB', quality: 'Full HD' },
  { ...childrenCatalog[9], size: '780 MB', quality: 'HD' },
  { ...childrenCatalog[13], size: '1.1 GB', quality: 'Full HD' },
];

const descriptions: Record<string, string> = {
  'Dune: Parte dos': 'Paul Atreides une fuerzas con Chani y los Fremen para enfrentar a quienes destruyeron a su familia.',
  'Glass Onion': 'Un detective reúne a un grupo de amigos en una isla privada, donde un juego se convierte en un misterio real.',
  'Proyecto Power': 'Una pastilla da poderes impredecibles durante cinco minutos y desata una carrera por controlar la ciudad.',
  'Misión de rescate 2': 'Un mercenario vuelve a la acción para rescatar a una familia atrapada detrás de una frontera peligrosa.',
  'El hombre gris': 'Un agente de la CIA se convierte en objetivo de una persecución internacional tras descubrir un secreto.',
  'El ejército de los muertos': 'Un grupo de mercenarios entra en una ciudad infestada para intentar recuperar una fortuna.',
  'El teléfono negro': 'Un joven secuestrado encuentra un teléfono que le permite escuchar las voces de anteriores víctimas.',
  'La sociedad de la nieve': 'Un equipo de rugby sobrevive a un accidente en los Andes y lucha por regresar a casa.',
  'Historia de un matrimonio': 'Una pareja intenta reconstruir su vida mientras atraviesa una separación difícil y honesta.',
  'El juicio de los 7 de Chicago': 'Siete manifestantes enfrentan un juicio histórico después de una protesta que marcó una época.',
  'Enola Holmes': 'Una joven detective busca a su madre desaparecida mientras descubre una conspiración en Londres.',
  'No mires arriba': 'Dos astrónomos intentan convencer al mundo de que un cometa está a punto de destruir la Tierra.',
  'A través de mi ventana': 'Una vecina observa a su misterioso crush hasta que una relación inesperada comienza a crecer.',
  'Nimona': 'Un caballero acusado de un crimen encuentra una aliada cambiante que puede demostrar su inocencia.',
  'Furiosa: de la saga Mad Max': 'Una joven es arrebatada de su hogar y atraviesa un desierto dominado por guerras y tiranos.',
  'Spaceman': 'Un astronauta aislado en una misión lejana recibe ayuda de una criatura que lo obliga a mirar su vida.',
  'Nyad': 'Una nadadora de sesenta años se prepara para cumplir el sueño de cruzar el mar a nado.',
  'El asesino': 'Un sicario metódico enfrenta las consecuencias de un trabajo fallido mientras intenta desaparecer.',
  'Los Mitchell contra las máquinas': 'Una familia dispareja debe salvar al mundo cuando los robots se rebelan contra la humanidad.',
  'Tu casa o la mía': 'Dos mejores amigos intercambian sus casas durante una semana y descubren sentimientos inesperados.',
  'The Rookie': 'Un novato comienza su carrera policial en Los Ángeles mientras intenta demostrar que merece una oportunidad.',
  'Policías de Chicago': 'Un equipo de detectives enfrenta casos peligrosos y conflictos personales en las calles de Chicago.',
  'Bones': 'Una antropóloga forense y un agente del FBI resuelven crímenes examinando restos humanos.',
  'Rick y Morty': 'Un científico brillante arrastra a su nieto a aventuras absurdas por dimensiones desconocidas.',
  'El joven Sheldon': 'Un niño superdotado intenta encajar en su familia y en una escuela que no siempre lo comprende.',
  'Titanes': 'Un grupo de jóvenes héroes aprende a controlar sus poderes mientras protege la ciudad.',
  'Merlina': 'Una estudiante brillante y oscura investiga secretos sobrenaturales dentro de su nueva academia.',
  'La casa de papel': 'Un estratega reúne a un grupo de especialistas para ejecutar el mayor atraco de España.',
  'The Witcher': 'Un cazador de monstruos recorre un mundo de magia, guerras y destinos unidos por una princesa.',
  'Bridgerton': 'Una familia de la alta sociedad navega romances, secretos y reglas durante la temporada londinense.',
  'Klaus': 'Un cartero y un fabricante de juguetes transforman una isla triste con un inesperado acto de bondad.',
  'Más allá de la Luna': 'Una niña construye un cohete para viajar a la Luna y demostrar que una antigua leyenda es real.',
  'Leo': 'Una lagartija descubre que le queda poco tiempo y decide ayudar a sus estudiantes a crecer con confianza.',
  'Matilda': 'Una niña extraordinaria usa su imaginación y su inteligencia para enfrentarse a adultos injustos.',
  'Vivo': 'Un kinkajú emprende un viaje musical para entregar una última canción llena de amor y amistad.',
  'Paddington': 'Un oso educado llega a Londres y encuentra una familia mientras vive aventuras inesperadas.',
};

function getDescription(item: Title) {
  return descriptions[item.title] ?? `Una historia de ${item.type.toLowerCase()} protagonizada por ${item.title}.`;
}

function MovieRow({ title, items, search }: { title: string; items: Title[]; search: string }) {
  const rowRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="mt-8">
      <View className="flex-row items-end justify-between">
        <Text className="text-xl font-bold text-white">{title}</Text>
        <View className="flex-row items-center">
          <Pressable accessibilityLabel={`Ver películas anteriores de ${title}`} className="mr-2 h-9 w-9 items-center justify-center rounded-full border border-[#454545] bg-[#202020] active:opacity-60" onPress={() => rowRef.current?.scrollTo({ x: Math.max(0, scrollOffset - 560), animated: true })}><Text className="text-2xl text-white">‹</Text></Pressable>
          <Pressable accessibilityLabel={`Ver más películas de ${title}`} className="h-9 w-9 items-center justify-center rounded-full bg-[#e50914] active:opacity-70" onPress={() => rowRef.current?.scrollTo({ x: scrollOffset + 560, animated: true })}><Text className="text-2xl text-white">›</Text></Pressable>
        </View>
      </View>
      <ScrollView ref={rowRef} className="mt-4" horizontal showsHorizontalScrollIndicator={false} onScroll={(event) => setScrollOffset(event.nativeEvent.contentOffset.x)} scrollEventThrottle={16}>
        {(filteredItems.length ? filteredItems : items).map((item) => (
          <Pressable key={`${title}-${item.title}`} className="mr-4 w-36 active:opacity-70" onHoverIn={() => setHoveredTitle(item.title)} onHoverOut={() => setHoveredTitle(null)}>
            <View className="relative"><Image className="h-52 w-36 rounded-xl" source={{ uri: item.image }} />{hoveredTitle === item.title && <View className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-black/85 p-2"><Text className="text-[10px] leading-3 text-white">{getDescription(item)}</Text></View>}</View>
            <Text className="mt-2 font-bold text-white" numberOfLines={1}>{item.title}</Text><Text className="mt-1 text-xs text-[#8c8c8c]">{item.type}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function BottomNavigation({ activeTab, onChange }: { activeTab: Tab; onChange: (tab: Tab) => void }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 z-50 w-full flex-row justify-around border-t border-[#292a30] bg-[#080808] px-2 pb-3 pt-3 shadow-lg md:px-10">
      {(['Inicio', 'Descargas', 'Perfil'] as Tab[]).map((tab) => (
        <Pressable key={tab} accessibilityRole="button" accessibilityLabel={tab} className="min-w-[92px] items-center px-4 active:opacity-60" onPress={() => onChange(tab)}>
          <Text className={`text-xl ${activeTab === tab ? 'text-[#e50914]' : 'text-[#777985]'}`}>{tab === 'Inicio' ? '⌂' : tab === 'Descargas' ? '↓' : '○'}</Text>
          <Text className={`mt-1 text-xs font-semibold ${activeTab === tab ? 'text-white' : 'text-[#777985]'}`}>{tab}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function ProfileAvatar({ size, className }: { size: number; className?: string }) {
  return (
    <View className={`overflow-hidden rounded-full ${className ?? ''}`} style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 448 448">
        <Rect width="448" height="448" fill="#1b7779" />
        <Circle cx="99" cy="174" r="25" fill="#fff" />
        <Circle cx="368" cy="174" r="25" fill="#fff" />
        <Path d="M198 295c52 35 133 35 185 0" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="22" />
      </Svg>
    </View>
  );
}

export default function App() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('Inicio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [profileNotice, setProfileNotice] = useState('');
  const popularRowRef = useRef<ScrollView>(null);
  const pageScrollRef = useRef<ScrollView>(null);

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    pageScrollRef.current?.scrollTo({ y: 0, animated: true });
  };
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredMovie = featuredMovies[featuredIndex];

  useEffect(() => {
    const recommendationTimer = setInterval(() => {
      setFeaturedIndex((currentIndex) => (currentIndex + 1) % featuredMovies.length);
      setIsPlaying(false);
    }, 5000);

    return () => clearInterval(recommendationTimer);
  }, []);

  return (
    <SafeAreaView className="w-full flex-1 overflow-hidden bg-[#080808]">
      <StatusBar style="light" />
      <ScrollView ref={pageScrollRef} className="w-screen max-w-full flex-1" contentContainerClassName="w-screen max-w-full flex-grow pb-28" contentContainerStyle={{ alignItems: 'stretch' }} showsVerticalScrollIndicator={false}>
        <View className="mx-auto min-h-screen w-screen max-w-[100vw] overflow-hidden px-5 pb-8 pt-4 md:px-10 md:pt-8 lg:px-14" style={{ alignSelf: 'stretch' }}>
          <View className="mb-7 flex-row items-center justify-between">
            <Pressable onPress={() => changeTab('Inicio')} className="active:opacity-70">
              <Text className="text-2xl font-black uppercase tracking-[5px] text-[#e50914]">CEFLIX</Text>
              <Text className="mt-1 text-xs font-semibold uppercase tracking-[2px] text-[#a7a7a7]">Tu pantalla, tus historias</Text>
            </Pressable>
            <Pressable className="h-11 w-11 items-center justify-center rounded-full border border-[#373737] bg-[#171717] active:opacity-60" onPress={() => changeTab('Perfil')}>
              <ProfileAvatar size={36} />
            </Pressable>
          </View>
          {activeTab === 'Inicio' && (
            <>
              <View className="mb-7 flex-row items-center rounded-xl border border-[#292929] bg-[#181818] px-4">
                <Text className="mr-3 text-xl text-[#8c8c8c]">⌕</Text>
                <TextInput className="h-12 flex-1 text-[15px] text-white" placeholder="Busca películas y series" placeholderTextColor="#777" value={search} onChangeText={setSearch} />
              </View>
              <View className="overflow-hidden rounded-2xl bg-[#252525] md:h-[360px]">
                <Image className="h-64 w-full opacity-70 md:h-full" source={{ uri: featuredMovie.image }} />
                <View className="absolute inset-0 bg-black/50" />
                <View className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
                  <Text className="mb-2 text-xs font-bold uppercase tracking-[3px] text-[#e50914]">Ceflix recomienda</Text>
                  <Text className="text-3xl font-bold text-white md:text-5xl">{featuredMovie.title}</Text>
                  <Text className="mt-1 max-w-lg text-sm text-[#ddd] md:text-base">{getDescription(featuredMovie)}</Text>
                  <View className="mt-4 flex-row items-center">
                    <Pressable className="mr-3 flex-row items-center rounded-md bg-white px-5 py-3 active:opacity-70" onPress={() => setIsPlaying(!isPlaying)}>
                      <Text className="mr-2 font-bold text-black">{isPlaying ? '||' : '▶'}</Text>
                      <Text className="font-bold text-black">{isPlaying ? 'Reproduciendo' : 'Reproducir'}</Text>
                    </Pressable>
                    <Pressable className="h-12 w-12 items-center justify-center rounded-md border border-white/50 bg-black/40 active:opacity-60"><Text className="text-2xl text-white">+</Text></Pressable>
                  </View>
                </View>
              </View>
              <View className="mt-8 flex-row items-end justify-between">
                <Text className="text-xl font-bold text-white">Seguir viendo</Text>
                <Pressable className="active:opacity-60" onPress={() => popularRowRef.current?.scrollToEnd({ animated: true })}>
                  <Text className="text-sm font-semibold text-[#e50914]">Desliza para ver más ›</Text>
                </Pressable>
              </View>
              <ScrollView ref={popularRowRef} className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
                {continueWatching.map((item) => (
                  <Pressable key={item.title} className="mr-4 w-44 active:opacity-70">
                    <Image className="h-24 w-44 rounded-lg" source={{ uri: item.image }} />
                    <View className="mt-2 h-1 overflow-hidden rounded-full bg-[#454545]"><View className="h-full w-2/3 bg-[#e50914]" /></View>
                    <Text className="mt-2 font-bold text-white">{item.title}</Text><Text className="mt-1 text-xs text-[#8c8c8c]">{item.episode}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              {movieRows.map((row) => <MovieRow key={row.title} title={row.title} items={row.items} search={search} />)}
              <MovieRow title="Series populares" items={seriesCatalog} search={search} />
              <MovieRow title="Películas para niños" items={childrenCatalog} search={search} />
            </>
          )}

          {activeTab === 'Descargas' && (
            <View className="min-h-[520px] w-full"><Text className="text-3xl font-bold text-white">Mis descargas</Text><Text className="mt-2 text-[#999]">Contenido listo para ver sin conexión.</Text><View className="mt-7 flex-row flex-wrap justify-between">
              {downloadedMovies.map((item) => <View key={item.title} className="mb-8 w-full rounded-xl border border-[#292929] bg-[#141414] p-3 md:w-[31.5%] lg:w-[23.5%]"><View className="relative"><Image className="h-52 w-full rounded-lg md:h-48" source={{ uri: item.image }} /><View className="absolute right-2 top-2 flex-row items-center rounded-md bg-[#0b0b0b]/90 px-2 py-1"><Text className="mr-1 text-xs text-[#31d158]">✓</Text><Text className="text-[10px] font-bold text-white">DESCARGADA</Text></View></View><Text className="mt-3 font-bold text-white" numberOfLines={1}>{item.title}</Text><Text className="mt-1 text-xs text-[#8c8c8c]">{item.quality}  •  {item.size}</Text><View className="mt-3 h-1 overflow-hidden rounded-full bg-[#3a3a3a]"><View className="h-full w-full bg-[#31d158]" /></View><View className="mt-3 flex-row items-center justify-between"><Text className="text-xs font-semibold text-[#31d158]">Disponible sin conexión</Text><Pressable accessibilityLabel={`Ver ahora ${item.title}`} className="rounded-md bg-white px-3 py-2 active:opacity-60" onPress={() => setProfileNotice(`${item.title} se puede ver sin conexión.`)}><Text className="text-xs font-bold text-black">Ver ahora</Text></Pressable></View></View>)}
            </View>{profileNotice ? <Text className="mt-2 text-sm font-semibold text-[#e50914]">{profileNotice}</Text> : null}</View>
          )}

          {activeTab === 'Perfil' && (
            <View className="min-h-[520px] w-full flex-1">
              <Text className="text-3xl font-bold text-white">Perfil</Text>
              <View className="mt-7 flex-row items-center border-b border-[#292929] pb-7">
                <ProfileAvatar size={80} />
                <View className="ml-5"><Text className="text-xl font-bold text-white">Camilo Gomez</Text><Text className="mt-1 text-[#999]">Plan Ceflix Premium</Text></View>
              </View>
              <View className="mt-6 w-full rounded-xl border border-[#292929] bg-[#141414] p-5 md:p-7">
                <Text className="mb-5 text-lg font-bold text-white">Información personal</Text>
                {[
                  ['Nombre', 'Camilo'],
                  ['Apellido', 'Gomez'],
                  ['Correo', 'gomezcamilo347@gmail.com'],
                  ['Teléfono', '+57 3235911772'],
                ].map(([label, value]) => (
                  <View key={label} className="border-b border-[#292929] py-4 last:border-b-0">
                    <Text className="text-xs uppercase tracking-[2px] text-[#888]">{label}</Text>
                    <Text className="mt-1 text-base text-white">{value}</Text>
                  </View>
                ))}
              </View>
              <View className="mt-8 w-full flex-row flex-wrap border-b border-[#292929] pb-2">
                {profileSections.map((section, index) => (
                  <Pressable key={section} className={`mr-5 pb-3 active:opacity-60 ${index === 0 ? 'border-b-2 border-[#e50914]' : ''}`} onPress={() => setProfileNotice(`${section} seleccionada.`)}>
                    <Text className={`text-sm font-semibold ${index === 0 ? 'text-white' : 'text-[#888]'}`}>{section}</Text>
                  </Pressable>
                ))}
              </View>
              <Text className="mt-7 text-lg font-bold text-white">Vínculos rápidos</Text>
              <View className="mt-3 w-full overflow-hidden rounded-xl border border-[#292929] bg-[#141414]">
                {accountOptions.map(([title, description]) => (
                  <Pressable key={title} className="flex-row items-center justify-between border-b border-[#292929] px-5 py-5 last:border-b-0 active:bg-[#202020]" onPress={() => setProfileNotice(`${title} seleccionado.`)}>
                    <View className="flex-1 pr-4"><Text className="text-base font-semibold text-white">{title}</Text><Text className="mt-1 text-xs text-[#888]">{description}</Text></View>
                    <Text className="text-xl text-[#999]">›</Text>
                  </Pressable>
                ))}
              </View>
              {profileNotice ? <Text className="mt-4 text-sm font-semibold text-[#e50914]">{profileNotice}</Text> : null}
            </View>
          )}
        </View>
      </ScrollView>
      <BottomNavigation activeTab={activeTab} onChange={changeTab} />
    </SafeAreaView>
  );
}
