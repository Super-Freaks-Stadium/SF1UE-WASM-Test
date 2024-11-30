const GAME_NAME = "Super Freaks 1 Ultimate Edition";
const GAME_VERSION = "1.0.0.0";

const CACHE_NAME = JSON.stringify({"name": GAME_NAME, "version": GAME_VERSION});
const CACHE_FILES = ["runner.data",
"runner.js",
"runner.wasm",
"audio-worklet.js",
"game.unx",
"msc_boss_1.ogg",
"msc_boss_2.ogg",
"msc_boss_antifreaks.ogg",
"msc_boss_cinge.ogg",
"msc_boss_dino_2.ogg",
"msc_boss_dino.ogg",
"msc_boss_francis.ogg",
"msc_boss_kranion_2.ogg",
"msc_boss_kranion.ogg",
"msc_boss_megaklaw.ogg",
"msc_boss_skullmobile.ogg",
"msc_bossrush.ogg",
"msc_canyon_secret.ogg",
"msc_canyon.ogg",
"msc_castle.ogg",
"msc_cutscene_ending.ogg",
"msc_cutscene_intro.ogg",
"msc_cutscene_normal.ogg",
"msc_cutscene_sticky.ogg",
"msc_encore.ogg",
"msc_fruit_secret.ogg",
"msc_fruit.ogg",
"msc_gameover_classic.ogg",
"msc_gameover.ogg",
"msc_hippie_secret.ogg",
"msc_hippie.ogg",
"msc_ice_secret.ogg",
"msc_ice.ogg",
"msc_lightning.ogg",
"msc_menu.ogg",
"msc_moon.ogg",
"msc_park.ogg",
"msc_ship.ogg",
"msc_skyway.ogg",
"msc_stadium.ogg",
"msc_star.ogg",
"msc_title.ogg",
"msc_toy_secret.ogg",
"msc_toy.ogg",
"msc_victory_kranion.ogg",
"msc_victory.ogg",
"msc_worldmap.ogg",
"options.ini",
"controllerblacklist.csv",
"controllertypes.csv",
"input_license.txt",
"licenses.txt",
"manual.docx",
"sdl2.txt",
"test_load_mapping.json",
"runner/msc_boss_1.ogg",
"runner/msc_boss_2.ogg",
"runner/msc_boss_antifreaks.ogg",
"runner/msc_boss_cinge.ogg",
"runner/msc_boss_dino_2.ogg",
"runner/msc_boss_dino.ogg",
"runner/msc_boss_francis.ogg",
"runner/msc_boss_kranion_2.ogg",
"runner/msc_boss_kranion.ogg",
"runner/msc_boss_megaklaw.ogg",
"runner/msc_boss_skullmobile.ogg",
"runner/msc_bossrush.ogg",
"runner/msc_canyon_secret.ogg",
"runner/msc_canyon.ogg",
"runner/msc_castle.ogg",
"runner/msc_cutscene_ending.ogg",
"runner/msc_cutscene_intro.ogg",
"runner/msc_cutscene_normal.ogg",
"runner/msc_cutscene_sticky.ogg",
"runner/msc_encore.ogg",
"runner/msc_fruit_secret.ogg",
"runner/msc_fruit.ogg",
"runner/msc_gameover_classic.ogg",
"runner/msc_gameover.ogg",
"runner/msc_hippie_secret.ogg",
"runner/msc_hippie.ogg",
"runner/msc_ice_secret.ogg",
"runner/msc_ice.ogg",
"runner/msc_lightning.ogg",
"runner/msc_menu.ogg",
"runner/msc_moon.ogg",
"runner/msc_park.ogg",
"runner/msc_ship.ogg",
"runner/msc_skyway.ogg",
"runner/msc_stadium.ogg",
"runner/msc_star.ogg",
"runner/msc_title.ogg",
"runner/msc_toy_secret.ogg",
"runner/msc_toy.ogg",
"runner/msc_victory_kranion.ogg",
"runner/msc_victory.ogg",
"runner/msc_worldmap.ogg",
"chars/!example/char.json",
"chars/!example/readme.txt",
"chars/!example/snd/death.ogg",
"chars/!example/spr/air.png",
"chars/!example/spr/climb.png",
"chars/!example/spr/death.png",
"chars/!example/spr/hang.png",
"chars/!example/spr/hud.png",
"chars/!example/spr/hurt.png",
"chars/!example/spr/jump.png",
"chars/!example/spr/mugshot.png",
"chars/!example/spr/pole_turn.png",
"chars/!example/spr/pole.png",
"chars/!example/spr/rail.png",
"chars/!example/spr/skid.png",
"chars/!example/spr/stand.png",
"chars/!example/spr/walk.png",
"chars/!example/spr/wall_slide.png",
"runner/chars/!example/snd/death.ogg"
];

self.addEventListener("fetch", (event) => {
  const should_cache = CACHE_FILES.some((f) => {
      return event.request.url.endsWith(f);
  });
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (should_cache) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.allSettled(
      keys.map((key) => {
        try {
          const data = JSON.parse(key);
          if (data && data["name"] && data.name == GAME_NAME &&
              data.version && data.version != GAME_VERSION) {
            return caches.delete(key);
          }
        } catch {
          return;
        }
      })
    )).then(() => {
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
