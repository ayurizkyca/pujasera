export const deleteMenuFromResto = (restaurant, { restoId, menuId }) => {
    return restaurant.map((resto) => {
        if (resto.id === restoId) {
            return {
                ...resto,
                menus: resto.menus.filter((menu) => menu.id !== menuId),
            };
        }
        return resto;
    });
};

export const editMenuInResto = (restaurant, { restoId, menuId, menu }) => {
    return restaurant.map((resto) => {
        if (resto.id === restoId) {
            return {
                ...resto,
                menus: resto.menus.map((menuEdit) => {
                    if (menuEdit.id === menuId) {
                        return menu;
                    }
                    return menuEdit;
                }),
            };
        }
        return resto;
    });
};

export const addMenuToResto = (restaurant, { restoId, menu }) => {
    return restaurant.map((resto) => {
        if (resto.id === restoId) {
            return {
                ...resto,
                menus: [...resto.menus, menu],
            };
        }
        return resto;
    });
};

export const updateStock = (restaurant, { restoId, menuId, stock }) => {
    return restaurant.map((resto) => {
        if (resto.id === restoId) {
            return {
                ...resto,
                menus: resto.menus.map((menu) => {
                    if (menu.id === menuId) {
                        return {
                            ...menu,
                            stock,
                        };
                    }
                    return menu;
                }),
            };
        }
        return resto;
    });
};


