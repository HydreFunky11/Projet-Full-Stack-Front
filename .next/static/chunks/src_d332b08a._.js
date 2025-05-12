(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/services/api/apiClient.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiRequest": (()=>apiRequest),
    "authService": (()=>authService),
    "getCookie": (()=>getCookie),
    "removeCookie": (()=>removeCookie),
    "setCookie": (()=>setCookie)
});
const API_URL = "https://projet-full-stack-api.onrender.com/api" //process.env.NEXT_PUBLIC_API_URL; || 'http://localhost:4000/api';
;
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
"[project]/src/contexts/authContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CreateCharacter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/characterService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$sessionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/sessionService.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../styles/characterForm.module.scss'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function CreateCharacter() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingSessions, setLoadingSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        race: '',
        class: '',
        level: 1,
        background: '',
        inventory: '',
        stats: JSON.stringify({
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            hitPoints: 0,
            maxHitPoints: 0
        }, null, 2),
        isAlive: true,
        sessionId: ''
    });
    // Charger les sessions disponibles
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateCharacter.useEffect": ()=>{
            const fetchSessions = {
                "CreateCharacter.useEffect.fetchSessions": async ()=>{
                    try {
                        setLoadingSessions(true);
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$sessionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sessionService"].getSessions();
                        // Filtrer les sessions pour n'inclure que celles où l'utilisateur est participant
                        const availableSessions = response.sessions.filter({
                            "CreateCharacter.useEffect.fetchSessions.availableSessions": (session)=>session.status !== 'terminée'
                        }["CreateCharacter.useEffect.fetchSessions.availableSessions"]);
                        setSessions(availableSessions);
                    } catch (err) {
                        console.error("Erreur lors du chargement des sessions:", err);
                    } finally{
                        setLoadingSessions(false);
                    }
                }
            }["CreateCharacter.useEffect.fetchSessions"];
            fetchSessions();
        }
    }["CreateCharacter.useEffect"], []);
    const handleChange = (e)=>{
        const { name, value, type } = e.target;
        if (type === 'number') {
            setFormData({
                ...formData,
                [name]: parseInt(value) || 1
            });
        } else if (name === 'stats') {
            try {
                // Valider que c'est un JSON valide
                JSON.parse(value);
                setFormData({
                    ...formData,
                    [name]: value
                });
            } catch (err) {
                // En cas d'erreur de format JSON, conserver l'ancienne valeur
                console.error("Format JSON invalide", err);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Préparer les données à envoyer
            const characterData = {
                ...formData,
                level: parseInt(formData.level.toString()),
                sessionId: formData.sessionId ? parseInt(formData.sessionId) : null
            };
            // Appeler l'API pour créer le personnage
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["characterService"].createCharacter(characterData);
            // Rediriger vers la page des détails du personnage
            router.push(`/characters/${response.character.id}`);
        } catch (err) {
            setError(err.message || "Une erreur est survenue lors de la création du personnage");
            console.error("Erreur lors de la création du personnage:", err);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles.formContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Créer un nouveau personnage"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/authContext.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/characters",
                        className: styles.backButton,
                        children: "← Retour aux personnages"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/authContext.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/contexts/authContext.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: styles.error,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/contexts/authContext.tsx",
                lineNumber: 119,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: styles.characterForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: styles.formSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Informations de base"
                            }, void 0, false, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: styles.formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "name",
                                        children: "Nom du personnage*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "name",
                                        name: "name",
                                        value: formData.name,
                                        onChange: handleChange,
                                        required: true,
                                        className: styles.formInput
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: styles.formRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: styles.formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "race",
                                                children: "Race*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 139,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "race",
                                                name: "race",
                                                value: formData.race,
                                                onChange: handleChange,
                                                required: true,
                                                className: styles.formInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: styles.formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "class",
                                                children: "Classe*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "class",
                                                name: "class",
                                                value: formData.class,
                                                onChange: handleChange,
                                                required: true,
                                                className: styles.formInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: styles.formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "level",
                                                children: "Niveau*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                id: "level",
                                                name: "level",
                                                min: "1",
                                                max: "20",
                                                value: formData.level,
                                                onChange: handleChange,
                                                required: true,
                                                className: styles.formInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 166,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: styles.formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "background",
                                        children: "Historique"
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "background",
                                        name: "background",
                                        value: formData.background,
                                        onChange: handleChange,
                                        className: styles.formInput,
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/contexts/authContext.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: styles.formSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Attributs & Inventaire"
                            }, void 0, false, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: styles.formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "stats",
                                        children: "Statistiques (Format JSON)*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "stats",
                                        name: "stats",
                                        value: formData.stats,
                                        onChange: handleChange,
                                        className: styles.formInput,
                                        rows: 10,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: styles.formHint,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                    children: "Exemple de format"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/contexts/authContext.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                    children: `{
  "strength": 10,
  "dexterity": 10,
  "constitution": 10,
  "intelligence": 10,
  "wisdom": 10,
  "charisma": 10,
  "hitPoints": 0,
  "maxHitPoints": 0
}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/contexts/authContext.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/contexts/authContext.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: styles.formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "inventory",
                                        children: "Inventaire"
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "inventory",
                                        name: "inventory",
                                        value: formData.inventory,
                                        onChange: handleChange,
                                        className: styles.formInput,
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/contexts/authContext.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: styles.formSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Session"
                            }, void 0, false, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: styles.formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sessionId",
                                        children: "Associer à une session"
                                    }, void 0, false, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "sessionId",
                                        name: "sessionId",
                                        value: formData.sessionId,
                                        onChange: handleChange,
                                        className: styles.formInput,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Aucune session"
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this),
                                            loadingSessions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                disabled: true,
                                                children: "Chargement des sessions..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/contexts/authContext.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, this) : sessions.map((session)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: session.id,
                                                    children: [
                                                        session.title,
                                                        " (",
                                                        session.status,
                                                        ")"
                                                    ]
                                                }, session.id, true, {
                                                    fileName: "[project]/src/contexts/authContext.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/contexts/authContext.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/contexts/authContext.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: styles.formActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: styles.submitButton,
                                disabled: loading,
                                children: loading ? 'Création en cours...' : 'Créer le personnage'
                            }, void 0, false, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/characters",
                                className: styles.cancelButton,
                                children: "Annuler"
                            }, void 0, false, {
                                fileName: "[project]/src/contexts/authContext.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/contexts/authContext.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/contexts/authContext.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/contexts/authContext.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(CreateCharacter, "OCULslxqw1j5Fuse/9TRK2aak6Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CreateCharacter;
var _c;
__turbopack_context__.k.register(_c, "CreateCharacter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/styles/navigation.module.scss.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "navigation-module-scss-module__qsn8Ya__active",
  "hamburger": "navigation-module-scss-module__qsn8Ya__hamburger",
  "logo": "navigation-module-scss-module__qsn8Ya__logo",
  "logoutButton": "navigation-module-scss-module__qsn8Ya__logoutButton",
  "mobileMenuButton": "navigation-module-scss-module__qsn8Ya__mobileMenuButton",
  "navContainer": "navigation-module-scss-module__qsn8Ya__navContainer",
  "navLink": "navigation-module-scss-module__qsn8Ya__navLink",
  "navLinks": "navigation-module-scss-module__qsn8Ya__navLinks",
  "navigation": "navigation-module-scss-module__qsn8Ya__navigation",
  "userMenu": "navigation-module-scss-module__qsn8Ya__userMenu",
  "username": "navigation-module-scss-module__qsn8Ya__username",
});
}}),
"[project]/src/components/navigation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Navigation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/authContext.tsx [app-client] (ecmascript)"); // Maintenant ce sera correctement importé
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/navigation.module.scss.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Navigation() {
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleMobileMenu = ()=>{
        setMobileMenuOpen(!mobileMenuOpen);
    };
    const handleLogout = async ()=>{
        await logout();
        setMobileMenuOpen(false);
    };
    const isActive = (path)=>{
        return pathname === path;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigation,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                    children: "JDR Manager"
                }, void 0, false, {
                    fileName: "[project]/src/components/navigation.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileMenuButton,
                    onClick: toggleMobileMenu,
                    "aria-label": "Menu principal",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hamburger
                    }, void 0, false, {
                        fileName: "[project]/src/components/navigation.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/navigation.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLinks} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                    children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink} ${isActive('/dashboard') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                onClick: ()=>setMobileMenuOpen(false),
                                children: "Tableau de bord"
                            }, void 0, false, {
                                fileName: "[project]/src/components/navigation.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/sessions",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink} ${isActive('/sessions') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                onClick: ()=>setMobileMenuOpen(false),
                                children: "Sessions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/navigation.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/characters",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink} ${isActive('/characters') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                onClick: ()=>setMobileMenuOpen(false),
                                children: "Personnages"
                            }, void 0, false, {
                                fileName: "[project]/src/components/navigation.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userMenu,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].username,
                                        children: user.username
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/navigation.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoutButton,
                                        children: "Déconnexion"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/navigation.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/navigation.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink} ${isActive('/login') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                onClick: ()=>setMobileMenuOpen(false),
                                children: "Connexion"
                            }, void 0, false, {
                                fileName: "[project]/src/components/navigation.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/register",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink} ${isActive('/register') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$navigation$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                onClick: ()=>setMobileMenuOpen(false),
                                children: "Inscription"
                            }, void 0, false, {
                                fileName: "[project]/src/components/navigation.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/components/navigation.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/navigation.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/navigation.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Navigation, "dgVHQLev8iS/5LuaHLhf2yPKUEI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_d332b08a._.js.map