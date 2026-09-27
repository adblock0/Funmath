# Chicken — Scramjet proxy fix

Deploy these files at the root of the GitHub Pages site.

Important:
- `index.html` is the Chicken entry page.
- `GameID.html`, `chatroom.html`, `dino-game.html`, and `sw.js` must be beside `index.html`.
- Keep `.nojekyll` in the root.
- The proxy uses Scramjet 2.0.67-alpha.2, controller 0.0.14, and Libcurl transport 2.0.5 by default.
- The page registers `sw.js` with cache-busting and initializes the Scramjet controller once.
- `dino-game.html` uses the standalone Dino source from SSSDNSY/FREE-SOURCE-CODE, with Chicken integration kept in the parent frame.

After deploying, reload the site. If a browser still has the previous service worker cached, hard-refresh once (or remove the old service worker for the site in browser DevTools) and reload.

The proxy still requires HTTPS (GitHub Pages provides this) and a reachable Wisp transport backend. The included configuration uses the public MercuryWorkshop Wisp endpoint.
