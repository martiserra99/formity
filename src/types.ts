type Position = ListPosition | CondPosition | LoopPosition;

type ListPosition = { [key: number]: Position };

type CondPosition = {
  then: { [key: number]: Position };
  else: { [key: number]: Position };
};

type LoopPosition = { [key: number]: Position };

type Name = { data: unknown; deps: { [key: string | number]: Deps } };

type Deps = { data: unknown; deps: { [key: string | number]: Deps } };

const a = {
  path: [
    ['list', 0],
    ['loop', 1],
    ['cond', ['then', 0]],
  ],
  name: 'name',
  deps: ['abc', 'def'],
};

type FlowDefaultValues =
  | ListDefaultValues
  | CondDefaultValues
  | LoopDefaultValues;

type ListDefaultValues = {
  [key: number]: FlowDefaultValues | NameDefaultValues;
};

type CondDefaultValues = {
  then: { [key: number]: FlowDefaultValues | NameDefaultValues };
  else: { [key: number]: FlowDefaultValues | NameDefaultValues };
};

type LoopDefaultValues = {
  [key: number]: FlowDefaultValues | NameDefaultValues;
};

type NameDefaultValues = {
  [key: string]: DepsDefaultValues;
};

type DepsDefaultValues = {
  [key: string | number]: { data: unknown; deps: DepsDefaultValues };
};

const defaultValues: ListDefaultValues = {
  0: {
    0: '',
    1: {
      then: {
        0: '',
        1: {
          0: {
            name: {
              data: '',
              deps: {
                a: {
                  data: '',
                  deps: {},
                },
              },
            },
          },
        },
      },
      else: {
        0: '',
        1: '',
      },
    },
  },
  1: {},
};
