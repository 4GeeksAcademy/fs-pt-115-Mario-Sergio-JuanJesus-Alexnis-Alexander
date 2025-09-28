export const initialDisabled = {
  reaction_casting_time: true,
  material_components: true,
  range_distance: true,
  duration: true,
  duration_select: true,
  higher_level_scaling: true,
};

export const rules = {
  casting_time_select: {
    Reaction: {
      reaction_casting_time: false,
    },
    "Bonus Action": {
      reaction_casting_time: true,
    },
    Action: {
      reaction_casting_time: true,
    },
    "No Action": {
      reaction_casting_time: true,
    },
  },

  m: {
    true: { material_components: false },
    false: { material_components: true },
  },

  spell_range: {
    Self: {
      range_distance: true,
    },
    Touch: {
      range_distance: true,
    },
    Ranged: {
      range_distance: false,
    },
    Sight: {
      range_distance: true,
    },
    Unlimited: {
      range_distance: true,
    },
  },

  duration_type: {
    duration_type: {
      duration: false,
      duration_select: false,
    },
    Concentration: {
      duration: false,
      duration_select: false,
    },
    Instantaneous: {
      duration: true,
      duration_select: true,
    },
    Special: {
      duration: false,
      duration_select: false,
    },
    Time: {
      duration: false,
      duration_select: false,
    },
  },

  at_higher_levels: {
    true: { higher_level_scaling: false },
    false: { higher_level_scaling: true },
  },
};
