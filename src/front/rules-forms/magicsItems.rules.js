export const initialDisabled = {
  base_armor: true,
  base_weapon: true,
  dex_bonus: true,
  str_requirement: true,
  stealth_check: true,
  magic_item_type: true,
  attunement_description: true,
};

export const rules = {
  base_item_type: {
    Item: {
      base_weapon: true,
      dex_bonus: true,
      str_requirement: true,
      stealth_check: true,
      magic_item_type: false,
      base_armor: true,
    },
    Armor: {
      base_armor: false,
      base_weapon: true,
      dex_bonus: false,
      str_requirement: false,
      stealth_check: false,
      magic_item_type: true,
    },
    Weapon: {
      base_weapon: false,
      base_armor: true,
      dex_bonus: true,
      str_requirement: true,
      stealth_check: true,
      magic_item_type: true,
    },
  },
  requires_attunement: {
    true: { attunement_description: false },
    false: { attunement_description: true },
  },
};
