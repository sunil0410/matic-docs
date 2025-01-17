---
id: staking
title: Staking на Polygon
description: Staking на Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Staking на Polygon {#staking-on-polygon}

Для Polygon Network любой участник может быть квалифицирован для того, чтобы стать валидатором сети, используя полный узел. Основным стимулом для запуска полного нода для валидаторов является получение вознаграждения за вознаграждение и транзакцию. Валидатор, участвующий в консенсусе для Polygon, заинтересован, поскольку он получает вознаграждение за блок и комиссию за транзакцию.

Поскольку слоты валидатора ограничены для сети, процесс выбора валидатора заключается в участии в аукционе в цепочке, который происходит с регулярными интервалами, [определенными здесь](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Размещение средств в стейкинге {#stake}

Если слот открыт, то аукцион запускается для заинтересованных валидаторов:

- Где они могут предложить больше последней ставки для слота.
- Процесс участия в аукционе описан здесь:
    - Аукцион запускается автоматически после открытия слота.
    - Чтобы начать участвовать в аукционе, выберите «Call» `startAuction()`
    - Это заблокирует ваши активы в Stack Manager.
    - Если другой потенциальный валидатор будет стейкинг больше, чем ваш стейк, то заблокированные токены будут возвращены вам.
    - Опять же, чтобы выиграть аукцион.
- По окончании периода аукциона выигрывает самый высокий участник торгов и становится валидатором в сети Polygon.

:::note

Пожалуйста, сохраните свой полный узел, если вы участвуете в аукционе.

:::

Процесс становления валидатора после победы наивысшего участника торгов в слоте приведен ниже:

- Выберите «Call» `confirmAuction()`, чтобы подтвердить свое участие.
- Bridge on Heimdall слушает это событие и транслирует в Heimdall.
- После консенсуса валидатор добавляется в Heimdall, но не активируется.
- Валидатор начинает валидировать только после `startEpoch`(определен [здесь)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Как только будет `startEpoch`получен, валидатор добавляется `validator-set`и начинает участвовать в механизме консенсуса.

:::info Рекомендуется

Чтобы обеспечить безопасность стейка валидаторов, мы рекомендуем им предоставлять другой `signer` адрес, с которого будет обрабатываться проверка `checkPoint` подписей. Это для сохранения подписи ключа отдельно от ключа кошелька валидатора, чтобы средства были защищены в случае взлома нода.

:::

### Вывод средств из стейкинга {#unstake}

Unstaking позволяет валидатору выйти из активного пула валидаторов. Чтобы обеспечить **хорошее участие**, их пакет заблокирован в течение следующих 21 дней.

Когда валидаторы хотят выйти из сети и прекратить проверку блоков и отправить checkpoints, они могут `unstake`. Этот иск сразу наша. После этого действия валидатор рассматривается из активного набора валидаторов.

### Добавление средств в стейкинг {#restake}

Валидаторы могут также добавить больше доли в свой количество, чтобы заработать больше наград и быть конкурентоспособным за место валидатора и сохранить свою позицию.
