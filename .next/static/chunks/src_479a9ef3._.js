(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

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
"[project]/src/styles/characterForm.module.scss.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "backButton": "characterForm-module-scss-module__vo0ULq__backButton",
  "cancelButton": "characterForm-module-scss-module__vo0ULq__cancelButton",
  "characterForm": "characterForm-module-scss-module__vo0ULq__characterForm",
  "error": "characterForm-module-scss-module__vo0ULq__error",
  "fadeIn": "characterForm-module-scss-module__vo0ULq__fadeIn",
  "formActions": "characterForm-module-scss-module__vo0ULq__formActions",
  "formContainer": "characterForm-module-scss-module__vo0ULq__formContainer",
  "formGroup": "characterForm-module-scss-module__vo0ULq__formGroup",
  "formHint": "characterForm-module-scss-module__vo0ULq__formHint",
  "formInput": "characterForm-module-scss-module__vo0ULq__formInput",
  "formRow": "characterForm-module-scss-module__vo0ULq__formRow",
  "formSection": "characterForm-module-scss-module__vo0ULq__formSection",
  "header": "characterForm-module-scss-module__vo0ULq__header",
  "submitButton": "characterForm-module-scss-module__vo0ULq__submitButton",
});
}}),
"[project]/src/app/characters/create/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/characterForm.module.scss.module.css [app-client] (css module)");
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
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Créer un nouveau personnage"
                    }, void 0, false, {
                        fileName: "[project]/src/app/characters/create/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/characters",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                        children: "← Retour aux personnages"
                    }, void 0, false, {
                        fileName: "[project]/src/app/characters/create/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/characters/create/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/characters/create/page.tsx",
                lineNumber: 119,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].characterForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Informations de base"
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "name",
                                        children: "Nom du personnage*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
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
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "race",
                                                children: "Race*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
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
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "class",
                                                children: "Classe*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
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
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "level",
                                                children: "Niveau*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
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
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "background",
                                        children: "Historique"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "background",
                                        name: "background",
                                        value: formData.background,
                                        onChange: handleChange,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput,
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/characters/create/page.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Attributs & Inventaire"
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "stats",
                                        children: "Statistiques (Format JSON)*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "stats",
                                        name: "stats",
                                        value: formData.stats,
                                        onChange: handleChange,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput,
                                        rows: 10,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formHint,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                    children: "Exemple de format"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/characters/create/page.tsx",
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
                                                    fileName: "[project]/src/app/characters/create/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/characters/create/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "inventory",
                                        children: "Inventaire"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "inventory",
                                        name: "inventory",
                                        value: formData.inventory,
                                        onChange: handleChange,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput,
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/characters/create/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Session"
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sessionId",
                                        children: "Associer à une session"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "sessionId",
                                        name: "sessionId",
                                        value: formData.sessionId,
                                        onChange: handleChange,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formInput,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Aucune session"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this),
                                            loadingSessions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                disabled: true,
                                                children: "Chargement des sessions..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/characters/create/page.tsx",
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
                                                    fileName: "[project]/src/app/characters/create/page.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/create/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/characters/create/page.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton,
                                disabled: loading,
                                children: loading ? 'Création en cours...' : 'Créer le personnage'
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/characters",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characterForm$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cancelButton,
                                children: "Annuler"
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/create/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/characters/create/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/characters/create/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/characters/create/page.tsx",
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
}]);

//# sourceMappingURL=src_479a9ef3._.js.map