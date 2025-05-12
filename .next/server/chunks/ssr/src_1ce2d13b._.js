module.exports = {

"[project]/src/services/api/apiClient.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiRequest": (()=>apiRequest),
    "authService": (()=>authService),
    "getCookie": (()=>getCookie),
    "removeCookie": (()=>removeCookie),
    "setCookie": (()=>setCookie)
});
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
function getCookie(name) {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
}
function setCookie(name, value, days = 7) {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}
function removeCookie(name) {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}
async function apiRequest(endpoint, options = {}) {
    const { method = 'GET', headers = {}, body, credentials = 'include', includeAuth = true } = options;
    const requestHeaders = {
        'Content-Type': 'application/json',
        ...headers
    };
    // Ajouter le token d'authentification si nécessaire
    if (includeAuth) {
        const token = getCookie('token');
        if (token) {
            requestHeaders['Authorization'] = `Bearer ${token}`;
        }
    }
    const requestOptions = {
        method,
        headers: requestHeaders,
        credentials,
        ...body && {
            body: JSON.stringify(body)
        }
    };
    try {
        const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
        const data = await response.json();
        // Capturer le token dans la réponse
        if (data.token) {
            setCookie('token', data.token);
        }
        if (!response.ok) {
            throw new Error(data.message || 'Une erreur est survenue');
        }
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Une erreur réseau est survenue');
    }
}
const authService = {
    async login (email, password) {
        try {
            const response = await apiRequest('/users/login', {
                method: 'POST',
                body: {
                    email,
                    password
                }
            });
            if (response.token) {
                setCookie('token', response.token);
            }
            return response;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            throw error;
        }
    },
    async register (username, email, password) {
        try {
            const response = await apiRequest('/users/register', {
                method: 'POST',
                body: {
                    username,
                    email,
                    password
                }
            });
            if (response.token) {
                setCookie('token', response.token);
            }
            return response;
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            throw error;
        }
    },
    async logout () {
        try {
            await apiRequest('/users/logout', {
                method: 'POST'
            });
            removeCookie('token');
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
            removeCookie('token');
        }
    },
    // À l'intérieur de authService
    async getCurrentUser () {
        try {
            console.log("getCurrentUser: Tentative de récupération de l'utilisateur");
            const url = `${API_URL}/users/me`; // Assurez-vous que cette URL est correcte
            console.log("URL appelée:", url);
            // Vérifier d'abord si un token existe
            const token = getCookie('token');
            if (!token) {
                console.log("getCurrentUser: Aucun token trouvé");
                return null;
            }
            console.log("getCurrentUser: Token trouvé:", token.substring(0, 10) + "...");
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });
            console.log("getCurrentUser: Statut de la réponse:", response.status);
            // Vérifier le type de contenu avant de parser
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error("getCurrentUser: Réponse non-JSON reçue");
                const text = await response.text();
                console.error("getCurrentUser: Contenu de la réponse:", text.substring(0, 150));
                throw new Error("Le serveur a renvoyé une réponse non-JSON");
            }
            const data = await response.json();
            if (!response.ok) {
                console.error("getCurrentUser: Erreur API:", data);
                throw new Error(data.message || "Erreur lors de la récupération de l'utilisateur");
            }
            console.log("getCurrentUser: Données reçues:", data);
            if (data.success && data.user) {
                return data.user;
            }
            return null;
        } catch (error) {
            console.error('getCurrentUser: Erreur de récupération du profil:', error);
            throw error;
        }
    },
    isAuthenticated () {
        return !!getCookie('token');
    }
};
}}),
"[project]/src/services/api/sessionService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "sessionService": (()=>sessionService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/apiClient.ts [app-ssr] (ecmascript)");
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions${queryParams}`);
    },
    getSessionById: async (id)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${id}`);
    },
    createSession: async (sessionData)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])('/sessions', {
            method: 'POST',
            body: sessionData
        });
    },
    updateSession: async (id, sessionData)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${id}`, {
            method: 'PUT',
            body: sessionData
        });
    },
    deleteSession: async (id)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${id}`, {
            method: 'DELETE'
        });
    },
    addParticipant: async (sessionId, userId, role)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${sessionId}/participants`, {
            method: 'POST',
            body: {
                userId,
                role
            }
        });
    },
    removeParticipant: async (sessionId, participantId)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/sessions/${sessionId}/participants/${participantId}`, {
            method: 'DELETE'
        });
    }
};
}}),
"[project]/src/services/api/characterService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "characterService": (()=>characterService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/apiClient.ts [app-ssr] (ecmascript)");
;
const characterService = {
    // Créer un nouveau personnage
    async createCharacter (characterData) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])('/characters', {
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
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])('/characters');
        } catch (error) {
            console.error('Erreur lors de la récupération des personnages:', error);
            throw error;
        }
    },
    // Récupérer un personnage par son ID
    async getCharacterById (id) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${id}`);
        } catch (error) {
            console.error(`Erreur lors de la récupération du personnage ${id}:`, error);
            throw error;
        }
    },
    // Mettre à jour un personnage
    async updateCharacter (id, characterData) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${id}`, {
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
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${id}`, {
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
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/session/${sessionId}`);
        } catch (error) {
            console.error(`Erreur lors de la récupération des personnages de la session ${sessionId}:`, error);
            throw error;
        }
    },
    // Associer un personnage à une session
    async assignToSession (characterId, sessionId) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiRequest"])(`/characters/${characterId}/assign-session`, {
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
}}),
"[project]/src/styles/dashboard.module.scss.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
});
}}),
"[project]/src/app/dashboard/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/authContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$sessionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/sessionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/characterService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/dashboard.module.scss.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
function Dashboard() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [characters, setCharacters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            try {
                setLoading(true);
                // Récupérer les sessions et personnages de l'utilisateur
                const sessionsResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$sessionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sessionService"].getSessions();
                const charactersResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterService"].getCharacters();
                setSessions(sessionsResponse.sessions.slice(0, 5)); // Afficher les 5 dernières sessions
                setCharacters(charactersResponse.characters.slice(0, 5)); // Afficher les 5 derniers personnages
            } catch (err) {
                setError(err.message);
            } finally{
                setLoading(false);
            }
        };
        if (user) {
            fetchData();
        }
    }, [
        user
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading,
            children: "Chargement..."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dashboard,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Tableau de bord"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].welcome,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dashboardGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Vos dernières sessions"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            sessions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].list,
                                children: sessions.map((session)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/sessions/${session.id}`,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].link,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                                    children: session.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vous n'avez pas encore de sessions."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/sessions",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].viewAllLink,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Vos personnages"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            characters.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].list,
                                children: characters.map((character)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].listItem,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/characters/${character.id}`,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].link,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                                    children: character.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Vous n'avez pas encore de personnages."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/characters",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].viewAllLink,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/sessions/create",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionButton,
                        children: "Créer une session"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/characters/create",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$dashboard$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionButton,
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
}}),

};

//# sourceMappingURL=src_1ce2d13b._.js.map