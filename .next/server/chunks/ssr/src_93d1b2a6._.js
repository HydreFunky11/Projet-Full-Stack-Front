module.exports = {

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
"[project]/src/styles/characters.module.scss.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "alive": "characters-module-scss-module__8gvetW__alive",
  "characterBackground": "characters-module-scss-module__8gvetW__characterBackground",
  "characterCard": "characters-module-scss-module__8gvetW__characterCard",
  "characterHeader": "characters-module-scss-module__8gvetW__characterHeader",
  "characterInfo": "characters-module-scss-module__8gvetW__characterInfo",
  "characterLevel": "characters-module-scss-module__8gvetW__characterLevel",
  "characterName": "characters-module-scss-module__8gvetW__characterName",
  "characterRaceClass": "characters-module-scss-module__8gvetW__characterRaceClass",
  "characterSession": "characters-module-scss-module__8gvetW__characterSession",
  "characterStatus": "characters-module-scss-module__8gvetW__characterStatus",
  "charactersContainer": "characters-module-scss-module__8gvetW__charactersContainer",
  "charactersList": "characters-module-scss-module__8gvetW__charactersList",
  "clearSearch": "characters-module-scss-module__8gvetW__clearSearch",
  "createButton": "characters-module-scss-module__8gvetW__createButton",
  "createForm": "characters-module-scss-module__8gvetW__createForm",
  "createFormContainer": "characters-module-scss-module__8gvetW__createFormContainer",
  "dead": "characters-module-scss-module__8gvetW__dead",
  "error": "characters-module-scss-module__8gvetW__error",
  "formActions": "characters-module-scss-module__8gvetW__formActions",
  "formGroup": "characters-module-scss-module__8gvetW__formGroup",
  "formRow": "characters-module-scss-module__8gvetW__formRow",
  "header": "characters-module-scss-module__8gvetW__header",
  "loading": "characters-module-scss-module__8gvetW__loading",
  "noCharacters": "characters-module-scss-module__8gvetW__noCharacters",
  "searchContainer": "characters-module-scss-module__8gvetW__searchContainer",
  "searchInput": "characters-module-scss-module__8gvetW__searchInput",
  "statusIndicator": "characters-module-scss-module__8gvetW__statusIndicator",
  "submitButton": "characters-module-scss-module__8gvetW__submitButton",
});
}}),
"[project]/src/app/characters/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Characters)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/characterService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/characters.module.scss.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
function Characters() {
    const [characters, setCharacters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchCharacters();
    }, []);
    const fetchCharacters = async ()=>{
        try {
            setLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$characterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["characterService"].getCharacters();
            setCharacters(response.characters);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    const filteredCharacters = characters.filter((char)=>char.name.toLowerCase().includes(searchTerm.toLowerCase()) || char.race.toLowerCase().includes(searchTerm.toLowerCase()) || char.class.toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].charactersContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Vos personnages"
                    }, void 0, false, {
                        fileName: "[project]/src/app/characters/page.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/characters/create",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].createButton,
                        children: "Créer un personnage"
                    }, void 0, false, {
                        fileName: "[project]/src/app/characters/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/characters/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Rechercher un personnage...",
                    value: searchTerm,
                    onChange: (e)=>setSearchTerm(e.target.value),
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchInput
                }, void 0, false, {
                    fileName: "[project]/src/app/characters/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/characters/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading,
                children: "Chargement des personnages..."
            }, void 0, false, {
                fileName: "[project]/src/app/characters/page.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/characters/page.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this) : filteredCharacters.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].noCharacters,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Aucun personnage trouvé."
                    }, void 0, false, {
                        fileName: "[project]/src/app/characters/page.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSearchTerm(''),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].clearSearch,
                        children: "Effacer la recherche"
                    }, void 0, false, {
                        fileName: "[project]/src/app/characters/page.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/characters/page.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].charactersList,
                children: filteredCharacters.map((character)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/characters/${character.id}`,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterName,
                                        children: character.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/characters/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterLevel,
                                        children: [
                                            "Niveau ",
                                            character.level
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/page.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterInfo,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterRaceClass,
                                        children: [
                                            character.race,
                                            " ",
                                            character.class
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    character.session && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterSession,
                                        children: [
                                            "Session: ",
                                            character.session.title
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/characters/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/characters/page.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            character.background && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterBackground,
                                children: character.background
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/page.tsx",
                                lineNumber: 92,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].characterStatus,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusIndicator} ${character.isAlive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].alive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$characters$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dead}`,
                                    children: character.isAlive ? 'Vivant' : 'Décédé'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/characters/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/characters/page.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this)
                        ]
                    }, character.id, true, {
                        fileName: "[project]/src/app/characters/page.tsx",
                        lineNumber: 72,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/characters/page.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/characters/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_93d1b2a6._.js.map