const operators: {
  id: string;
  label?: string;
  value: string;
  negate: boolean;
}[] = [
  {
    id: "1",
    label: "is one of",
    value: "in",
    negate: false,
  },
  {
    id: "2",
    label: "is not one of",
    value: "in",
    negate: true,
  },
  {
    id: "3",
    value: "segmentMatch",
    negate: false,
  },
  {
    id: "4",
    value: "segmentMatch",
    negate: true,
  },
  {
    id: "5",
    label: "ends with",
    value: "endsWith",
    negate: false,
  },
  {
    id: "6",
    label: "does not end with",
    value: "endsWith",
    negate: true,
  },
  {
    id: "7",
    label: "starts with",
    value: "startsWith",
    negate: false,
  },
  {
    id: "8",
    label: "does not start with",
    value: "startsWith",
    negate: true,
  },
  {
    id: "9",
    label: "contains",
    value: "matches",
    negate: false,
  },
  {
    id: "10",
    label: "does not contain",
    value: "matches",
    negate: true,
  },
  {
    id: "11",
    label: "<",
    value: "lessThan",
    negate: false,
  },
  {
    id: "12",
    label: "<=",
    value: "lessThanOrEqual",
    negate: false,
  },
  {
    id: "13",
    label: ">",
    value: "greaterThan",
    negate: false,
  },
  {
    id: "14",
    label: ">=",
    value: "greaterThanOrEqual",
    negate: false,
  },
  {
    id: "15",
    label: "before",
    value: "before",
    negate: false,
  },
  {
    id: "16",
    label: "after",
    value: "after",
    negate: false,
  },
  {
    id: "17",
    label: "semVer is one of",
    value: "semVerEqual",
    negate: false,
  },
  {
    id: "18",
    label: "semVer <",
    value: "semVerLessThan",
    negate: true,
  },
  {
    id: "19",
    label: "semVer <=",
    value: "semVerGreaterThan",
    negate: true,
  },
  {
    id: "20",
    label: "semVer >",
    value: "semVerGreaterThan",
    negate: false,
  },
  {
    id: "21",
    label: "semVer >",
    value: "semVerLessThan",
    negate: true,
  },
];

export default operators;
