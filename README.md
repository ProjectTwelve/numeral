# Numeral

> format number

## Install

```shell
npm install @p12/numeral
```

## How to use

| Name           | Type           | Default           | Description   |
|----------------|----------------|-------------------|---------------|
| numeral        | String  Number |                   | numeral input |
| numeral.format | NumeralType    | NumeralType.Token | format input  |

`NumeralType`

```typescript
enum NumeralType {
  GameCoin,
  Token,
  Transfer,
}
```

`numeral`

```typescript
import {numeral, NumeralType} from '@p12/numeral';

const str = numeral('1028').format(NumeralType.GameCoin);
console.log(str); // 1.028k
```
