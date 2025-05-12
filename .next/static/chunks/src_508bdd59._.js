(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/services/api/sessionService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "sessionService": (()=>sessionService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/apiClient.ts [app-client] (ecmascript)");
;
const sessionService = {
    getSessions: async (filters)=>{
        let queryParams = '';
        if (filters) {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.gmId) params.append('gmId', filters.gmId.toString());
            if (filters.title) params.append('title', filters.title);
            queryParams = `?${params.toString()}`;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions${queryParams}`);
    },
    getSessionById: async (id)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${id}`);
    },
    createSession: async (sessionData)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/sessions', {
            method: 'POST',
            body: sessionData
        });
    },
    updateSession: async (id, sessionData)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${id}`, {
            method: 'PUT',
            body: sessionData
        });
    },
    deleteSession: async (id)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${id}`, {
            method: 'DELETE'
        });
    },
    addParticipant: async (sessionId, userId, role)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${sessionId}/participants`, {
            method: 'POST',
            body: {
                userId,
                role
            }
        });
    },
    removeParticipant: async (sessionId, participantId)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${sessionId}/participants/${participantId}`, {
            method: 'DELETE'
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/api/characterService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "characterService": (()=>characterService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/apiClient.ts [app-client] (ecmascript)");
;
const characterService = {
    // Créer un nouveau personnage
    async createCharacter (characterData) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/characters', {
                method: 'POST',
                body: characterData
            });
        } catch (error) {
            console.error('Erreur lors de la création du personnage:', error);
            throw error;
        }
    },
    // Récupérer tous les personnages de l'utilisateur
    async getCharacters () {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/characters');
        } catch (error) {
            console.error('Erreur lors de la récupération des personnages:', error);
            throw error;
        }
    },
    // Récupérer un personnage par son ID
    async getCharacterById (id) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${id}`);
        } catch (error) {
            console.error(`Erreur lors de la récupération du personnage ${id}:`, error);
            throw error;
        }
    },
    // Mettre à jour un personnage
    async updateCharacter (id, characterData) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${id}`, {
                method: 'PUT',
                body: characterData
            });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du personnage ${id}:`, error);
            throw error;
        }
    },
    // Supprimer un personnage
    async deleteCharacter (id) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(`Erreur lors de la suppression du personnage ${id}:`, error);
            throw error;
        }
    },
    // Récupérer les personnages d'une session
    async getSessionCharacters (sessionId) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/session/${sessionId}`);
        } catch (error) {
            console.error(`Erreur lors de la récupération des personnages de la session ${sessionId}:`, error);
            throw error;
        }
    },
    // Associer un personnage à une session
    async assignToSession (characterId, sessionId) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${characterId}/assign-session`, {
                method: 'PUT',
                body: {
                    sessionId
                }
            });
        } catch (error) {
            console.error(`Erreur lors de l'association du personnage ${characterId} à la session:`, error);
            throw error;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/styles/dashboard.module.scss.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "dashboard-module-scss-module__BBjD5W__active",
  "campaignsStat": "dashboard-module-scss-module__BBjD5W__campaignsStat",
  "charactersStat": "dashboard-module-scss-module__BBjD5W__charactersStat",
  "completed": "dashboard-module-scss-module__BBjD5W__completed",
  "createButton": "dashboard-module-scss-module__BBjD5W__createButton",
  "dashboardContainer": "dashboard-module-scss-module__BBjD5W__dashboardContainer",
  "gamesStat": "dashboard-module-scss-module__BBjD5W__gamesStat",
  "header": "dashboard-module-scss-module__BBjD5W__header",
  "more": "dashboard-module-scss-module__BBjD5W__more",
  "noContent": "dashboard-module-scss-module__BBjD5W__noContent",
  "participant": "dashboard-module-scss-module__BBjD5W__participant",
  "planned": "dashboard-module-scss-module__BBjD5W__planned",
  "recentCard": "dashboard-module-scss-module__BBjD5W__recentCard",
  "recentContent": "dashboard-module-scss-module__BBjD5W__recentContent",
  "recentDate": "dashboard-module-scss-module__BBjD5W__recentDate",
  "recentFooter": "dashboard-module-scss-module__BBjD5W__recentFooter",
  "recentGrid": "dashboard-module-scss-module__BBjD5W__recentGrid",
  "recentHeader": "dashboard-module-scss-module__BBjD5W__recentHeader",
  "recentParticipants": "dashboard-module-scss-module__BBjD5W__recentParticipants",
  "recentStatus": "dashboard-module-scss-module__BBjD5W__recentStatus",
  "recentTitle": "dashboard-module-scss-module__BBjD5W__recentTitle",
  "sectionHeader": "dashboard-module-scss-module__BBjD5W__sectionHeader",
  "sessionsStat": "dashboard-module-scss-module__BBjD5W__sessionsStat",
  "statCard": "dashboard-module-scss-module__BBjD5W__statCard",
  "statDescription": "dashboard-module-scss-module__BBjD5W__statDescription",
  "statTitle": "dashboard-module-scss-module__BBjD5W__statTitle",
  "statValue": "dashboard-module-scss-module__BBjD5W__statValue",
  "statsGrid": "dashboard-module-scss-module__BBjD5W__statsGrid",
  "viewAllLink": "dashboard-module-scss-module__BBjD5W__viewAllLink",
});
}}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/authContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$sessionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/sessionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/characterService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/dashboard.module.scss.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Dashboard() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [characters, setCharacters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const fetchData = {
                "Dashboard.useEffect.fetchData": async ()=>{
                    try {
                        setLoading(true);
                        // Récupérer les sessions et personnages de l'utilisateur
                        const sessionsResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$sessionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sessionService"].getSessions();
                        const charactersResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterService"].getCharacters();
                        setSessions(sessionsResponse.sessions.slice(0, 5)); // Afficher les 5 dernières sessions
                        setCharacters(charactersResponse.characters.slice(0, 5)); // Afficher les 5 derniers personnages
                    } catch (err) {
                        setError(err.message);
                    } finally{
                        setLoading(false);
                    }
                }
            }["Dashboard.useEffect.fetchData"];
            if (user) {
                fetchData();
            }
        }
    }["Dashboard.useEffect"], [
        user
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
            children: "Chargement..."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
            children: [
                "Erreur: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 44,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboard,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Tableau de bord"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].welcome,
                children: [
                    "Bienvenue, ",
                    user?.username,
                    "!"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Vos dernières sessions"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            sessions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].list,
                                children: sessions.map((session)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].listItem,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/sessions/${session.id}`,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                                    children: session.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].status,
                                                    children: session.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 59,
                                            columnNumber: 19
                                        }, this)
                                    }, session.id, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vous n'avez pas encore de sessions."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/sessions",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewAllLink,
                                children: "Voir toutes les sessions"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Vos personnages"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            characters.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].list,
                                children: characters.map((character)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].listItem,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/characters/${character.id}`,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                                    children: character.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                                                    children: [
                                                        character.race,
                                                        " ",
                                                        character.class,
                                                        " (Niv. ",
                                                        character.level,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 80,
                                            columnNumber: 19
                                        }, this)
                                    }, character.id, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vous n'avez pas encore de personnages."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/characters",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewAllLink,
                                children: "Voir tous les personnages"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/sessions/create",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                        children: "Créer une session"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/characters/create",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                        children: "Créer un personnage"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "uxBaMZ8J2tju6jw1iNR5NuwQQQU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_508bdd59._.js.map