if (!window.WH) {
    window.WH = {};
    window.WH.debug = function (...args) {
        console.log(args);
    };
    window.WH.defaultAnimation = `Stand`;
}
const axios = (() => {
    try {
        return require(`axios`);
    } catch (e) {
        // eslint-disable-next-line no-undef
        return jQuery.ajax;
    }
})();


const NOT_DISPLAYED_SLOTS = [
    2, // neck
    11, // finger1
    12, // finger1
    13, // trinket1
    14, // trinket2
];

/**
 * Returns a 2 dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<int[]>}
 */
async function findItemsInEquipments(equipments) {
    for (const equipment of equipments) {
        if (NOT_DISPLAYED_SLOTS.includes(equipment.slot)) {
            continue;
        }
        const displayedItem = (Object.keys(equipment.transmog).length !== 0) ? equipment.transmog : equipment.item;
        const displaySlot = await getDisplaySlot(
            displayedItem.entry,
            equipment.slot,
            displayedItem.displayid
        );
        equipment.displaySlot = displaySlot.displaySlot;
        equipment.displayId = displaySlot.displayId;
        Object.assign(displaySlot, equipment);
    }
    return equipments
        .filter(e => e.displaySlot)
        .map(e => {
            return [
                e.displaySlot,
                e.displayId
            ];
        });

}


/**
 *
 * @return {[{}]}
 */
/**
 *
 * @param {int} race
 * @param {int} gender
 * @returns {Promise<AxiosResponse<{{}}>}
 */
async function findRaceGenderOptions(race, gender) {
    const options = await axios({
        url: `https://wow.zamimg.com/modelviewer/live/meta/charactercustomization2/${race}_${gender}.json`,
        method: `get`
    });
    if (options.data) {
        return options.data;
    } else {
        return options;
    }
}

/**
 *
 * @param {int} item: Item id
 * @param {int} slot: Item slot number
 * @param {int} displayId: DisplayId of hte item
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot(item, slot, displayId) {
    try {
        await axios({
            url: `https://wow.zamimg.com/modelviewer/live/meta/armor/${slot}/${displayId}.json`,
            method: `get`
        });

        return {
            displaySlot: slot,
            displayId: displayId
        };
    } catch (e) {
        const resp = await axios({
            url: `https://wotlk.murlocvillage.com/api/items/${item}/${displayId}`,
            method: `get`
        });
        const res = resp.data ? resp.data : resp;
        if (res.newDisplayId !== displayId) {
            return {
                displaySlot: slot,
                displayId: res.newDisplayId
            };
        }
    }

    // old slots to new slots
    const retSlot = {
        5: 20, // chest
        16: 21, // main hand
        18: 22 // off hand
    }[slot];
    if (!retSlot) {
        console.warn(`Item: ${item} display: ${displayId} or slot: ${slot} not found for `);

        return {
            displaySlot: slot,
            displayId: displayId
        };
    }

    return {
        displaySlot: retSlot,
        displayId: displayId
    };
}

// eslint-disable-next-line no-undef
class WowModelViewer extends ZamModelViewer {
    getListAnimations() {
        return [
            `ArtBowLoop`,
            `ArtDualLoop`,
            `ArtFistsLoop`,
            `ArtMainLoop`,
            `ArtOffLoop`,
            `ArtShieldLoop`,
            `Attack1H`,
            `Attack1HPierce`,
            `Attack2H`,
            `Attack2HL`,
            `Attack2HLoosePierce`,
            `AttackBow`,
            `AttackCrossbow`,
            `AttackFL`,
            `AttackFLOff`,
            `AttackFist1H`,
            `AttackFist1HOff`,
            `AttackJoust`,
            `AttackOff`,
            `AttackOffPierce`,
            `AttackRifle`,
            `AttackThrown`,
            `AttackUnarmed`,
            `BackFlipLoop`,
            `BackFlipStart`,
            `BattleRoar`,
            `BreathOfFire`,
            `CastCurseLeft`,
            `CastCurseRight`,
            `CastOutStrong`,
            `CastStrongLeft`,
            `CastStrongRight`,
            `CastStrongUpLeft`,
            `CastStrongUpRight`,
            `CastSweepLeft`,
            `CastSweepRight`,
            `CastTwistUpBoth`,
            `ChannelCastDirected`,
            `ChannelCastOmni`,
            `ChannelCastOmniUp`,
            `CombatAbility1H01`,
            `CombatAbility1H01Off`,
            `CombatAbility1H02`,
            `CombatAbility1H02Off`,
            `CombatAbility1H03Off`,
            `CombatAbility1HBig01`,
            `CombatAbility1HOffPierce`,
            `CombatAbility1HPierce`,
            `CombatAbility2H01`,
            `CombatAbility2H02`,
            `CombatAbility2H03`,
            `CombatAbility2HBig01`,
            `CombatAbility2HBig02`,
            `CombatAbilityDualWield01`,
            `CombatAbilityGlv01`,
            `CombatAbilityGlvBig01`,
            `CombatAbilityGlvBig02`,
            `CombatAbilityGlvBig03`,
            `CombatAbilityGlvOff01`,
            `CombatBladeStorm`,
            `CombatChargeEnd`,
            `CombatChargeLoop`,
            `CombatCritical`,
            `CombatEviscerate`,
            `CombatExecute`,
            `CombatFinishingMove`,
            `CombatFuriousStrikes`,
            `CombatLeapEnd`,
            `CombatLeapStart`,
            `CombatMutilate`,
            `CombatPistolShotOff`,
            `CombatShieldBash`,
            `CombatShieldThrow`,
            `CombatStompLeft`,
            `CombatStompRight`,
            `CombatThrow`,
            `CombatWhirlwind`,
            `CombatWound`,
            `Cower`,
            `DHBladeDance1`,
            `DHBladeDance2`,
            `DHBladeDance3`,
            `DHCombatRun`,
            `DHCombatSprint`,
            `DHGlide`,
            `DHMeteorStrike`,
            `Death`,
            `DeathStrike`,
            `DkCast1HFront`,
            `Dodge`,
            `DoubleJump`,
            `DoubleJumpStart`,
            `DragonStomp`,
            `DressingRoom`,
            `Drown`,
            `Drowned`,
            `DruReadySpellCast`,
            `DruSpellPrecastBoth`,
            `DruSpellPrecastBothChannel`,
            `EmoteApplaud`,
            `EmoteBeg`,
            `EmoteBow`,
            `EmoteCheer`,
            `EmoteChicken`,
            `EmoteCry`,
            `EmoteDance`,
            `EmoteEat`,
            `EmoteEatNoSheathe`,
            `EmoteFlex`,
            `EmoteKiss`,
            `EmoteKneel`,
            `EmoteLaugh`,
            `EmoteNo`,
            `EmotePoint`,
            `EmotePointNoSheathe`,
            `EmoteReadEnd`,
            `EmoteReadLoop`,
            `EmoteReadStart`,
            `EmoteRoar`,
            `EmoteRude`,
            `EmoteSalute`,
            `EmoteSaluteNoSheathe`,
            `EmoteShout`,
            `EmoteShy`,
            `EmoteStunNoSheathe`,
            `EmoteTalk`,
            `EmoteTalkExclamation`,
            `EmoteTalkNoSheathe`,
            `EmoteTalkQuestion`,
            `EmoteTrain`,
            `EmoteUseStanding`,
            `EmoteUseStandingNoSheathe`,
            `EmoteWave`,
            `EmoteWork`,
            `EmoteWorkNoSheathe`,
            `EmoteYes`,
            `FacePose`,
            `Fall`,
            `FelRushEnd`,
            `FelRushLoop`,
            `FishingCast`,
            `FishingLoop`,
            `FlyingKick`,
            `FlyingKickEnd`,
            `FlyingKickStart`,
            `GlvThrowMain`,
            `GlvThrownOff`,
            `HandsClosed`,
            `HipSheath`,
            `HoldBow`,
            `HoldCrossbow`,
            `HoldJoust`,
            `HoldRifle`,
            `HoldThrown`,
            `Hover`,
            `Jump`,
            `JumpEnd`,
            `JumpLandRun`,
            `JumpStart`,
            `Kick`,
            `KneelEnd`,
            `KneelLoop`,
            `KneelStart`,
            `Knockdown`,
            `LoadBow`,
            `LoadCrossbow`,
            `LoadJoust`,
            `LoadRifle`,
            `LocReadySpellCast`,
            `LocSpellCastBothFront`,
            `LocSpellPrecastBoth`,
            `LocSpellPrecastBothChannel`,
            `LocSummon`,
            `Loot`,
            `MagReadySpellCast`,
            `MagSpellCastBothFront`,
            `MagSpellPrecastBoth`,
            `MagSpellPrecastBothChannel`,
            `Meditate`,
            `Monk2HLIdle`,
            `MonkDefenseAttackUnarmed`,
            `MonkDefenseAttackUnarmedOff`,
            `MonkDefenseParryUnarmed`,
            `MonkDefenseReadyUnarmed`,
            `MonkDefenseSpecialUnarmed`,
            `MonkHealAttackUnarmed`,
            `MonkHealChannelCastDirected`,
            `MonkHealChannelCastOmni`,
            `MonkHealReadySpellDirected`,
            `MonkHealReadySpellOmni`,
            `MonkHealReadyUnarmed`,
            `MonkHealSpellCastDirected`,
            `MonkHealSpellCastOmni`,
            `MonkOffenseAttackUnarmed`,
            `MonkOffenseAttackUnarmedOff`,
            `MonkOffenseAttackWeapon`,
            `MonkOffenseParryUnarmed`,
            `MonkOffenseReadyUnarmed`,
            `MonkOffenseSpecialUnarmed`,
            `Mount`,
            `MountChopper`,
            `MountWide`,
            `Mutilate`,
            `PalSpellCast1HUp`,
            `PalSpellCastRightFront`,
            `PalSpellPrecastRight`,
            `PalmStrike`,
            `Parry1H`,
            `Parry2H`,
            `Parry2HL`,
            `ParryFL`,
            `ParryFist1H`,
            `ParryGlv`,
            `ParryUnarmed`,
            `PriHoverBackward`,
            `PriHoverForward`,
            `PriHoverLeft`,
            `PriHoverRight`,
            `PriReadyPostSpellCast`,
            `PriReadySpellCast`,
            `PriSpellCastBothFront`,
            `PriSpellCastBothFrontChannel`,
            `PriSpellCastBothUp`,
            `PriSpellCastBothUpChannel`,
            `PriSpellPrecastBoth`,
            `PriSpellPrecastBothChannel`,
            `Ready1H`,
            `Ready2H`,
            `Ready2HL`,
            `ReadyBow`,
            `ReadyCrossbow`,
            `ReadyFL`,
            `ReadyFist1H`,
            `ReadyGlv`,
            `ReadyJoust`,
            `ReadyRifle`,
            `ReadySpellDirected`,
            `ReadySpellOmni`,
            `ReadyThrown`,
            `ReadyUnarmed`,
            `ReclinedMount`,
            `ReclinedMountPassenger`,
            `RisingSunKick`,
            `Roll`,
            `RollEnd`,
            `RollStart`,
            `RoundHouseKick`,
            `Run`,
            `RunBackwards`,
            `ShaReadySpellCast`,
            `ShaSpellCastBothFront`,
            `ShaSpellPrecastBoth`,
            `ShaSpellPrecastBothChannel`,
            `Sheath`,
            `ShieldBash`,
            `ShieldBlock`,
            `ShuffleLeft`,
            `ShuffleRight`,
            `SingleJumpStart`,
            `SitChairHigh`,
            `SitChairLow`,
            `SitChairMed`,
            `SitGround`,
            `SitGroundDown`,
            `SitGroundUp`,
            `Slam`,
            `Sleep`,
            `SleepDown`,
            `SleepUp`,
            `Special1H`,
            `Special2H`,
            `SpecialDual`,
            `SpecialFL`,
            `SpecialFist1H`,
            `SpecialUnarmed`,
            `SpellCastDirected`,
            `SpellCastOmni`,
            `SpellKneelEnd`,
            `SpellKneelLoop`,
            `SpellKneelStart`,
            `SpellSleepDown`,
            `SpinningKick`,
            `Sprint`,
            `Stand`,
            `StandCharacterCreate`,
            `StandWound`,
            `StealthRun`,
            `StealthStand`,
            `StealthWalk`,
            `Stop`,
            `Stormstrike`,
            `Strangulate`,
            `Stun`,
            `Swim`,
            `SwimBackwards`,
            `SwimIdle`,
            `SwimLeft`,
            `SwimRight`,
            `SwimRun`,
            `SwimWalk`,
            `ThousandFists`,
            `Torpedo`,
            `UseStandingEnd`,
            `UseStandingLoop`,
            `UseStandingStart`,
            `WABarrelHold`,
            `WABarrelWalk`,
            `WACrateHold`,
            `WADrunkDrink`,
            `WADrunkStand`,
            `WADrunkWalk`,
            `WAGuardStand01`,
            `WAGuardStand02`,
            `WAGuardStand03`,
            `WAGuardStand04`,
            `WAHammerLoop`,
            `WASackHold`,
            `WAScrubbing`,
            `WAWheelBarrowStand`,
            `WAWheelBarrowWalk`,
            `Walk`,
            `Walkbackwards`,
            `Whirlwind`
        ];
    }

    /**
     * Change character distance
     * @param {int} val
     */
    setDistance(val) {
        this.renderer.distance = val;
    }

    setFullscreen(val) {
        super.setFullscreen(val);
    }

    /**
     *
     * @param {string} val
     */
    setAnimation(val) {
        if (!this.getListAnimations().includes(val)) {
            console.warn(`${this.constructor.name}: Animation ${val} not found`);
        }
        this.renderer.models[0].setAnimation(val);
    }

    /**
     *
     * @param {boolean} val
     */
    setAnimPaused(val) {
        this.renderer.models[0].setAnimPaused(val);
    }
}

/**
 *
 * @param {int} aspect: Size of the character
 * @param {string} containerSelector: jQuery selector on the container
 * @param {{}} character: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, character) {
    const fullOptions = await findRaceGenderOptions(
        character.race,
        character.gender
    );

    // slot ids on model viewer
    const characterItems = (character.items) ? character.items.filter(e => !NOT_DISPLAYED_SLOTS.includes(e[0])) : [];

    const options = await getOptions(character, fullOptions);
    const models = {
        type: 2,
        contentPath: `https://wow.zamimg.com/modelviewer/live/`,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        hd: true,
        models:
            {
                id: characterGenderRaceToModel(character.race, character.gender),
                type: 16
            },
        items: characterItems,
        zoom: 2,
        charCustomization: {
            options: options
        }
    };

    // eslint-disable-next-line no-undef
    return new WowModelViewer(models);
}

/**
 *
 * @param character
 * @param {{}}fullOptions: Zaming API character options payload
 * @return {Promise<[]>}
 */
async function getOptions(character, fullOptions) {
    const options = fullOptions.Options;
    const characterPart = {
        Face: `face`,
        "Skin Color": `skin`,
        "Hair Style": `hairStyle`,
        "Hair Color": `hairColor`,
        "Facial Hair": `facialStyle`,
        Mustache: `facialStyle`,
        Beard: `facialStyle`,
        Sideburns: `facialStyle`,
        "Face Shape": `facialStyle`,
        Eyebrow: `facialStyle`,
        "Jaw Features": undefined,
        "Face Features": undefined,
        "Skin Type": undefined,
        Ears: undefined,
        Horns: undefined,
        Blindfold: undefined,
        Tattoo: undefined,
        "Eye Color": undefined,
        "Tattoo Color": undefined,
        Armbands: undefined,
        "Jewelry Color": undefined,
        Bracelets: undefined,
        Necklace: undefined,
        Earring: undefined
    };

    const ret = [];
    for (const prop in characterPart) {
        const part = options.find(e => e.Name === prop);
        if (!part) {
            continue;
        }
        const newOption = {
            optionId: part.Id,
            choiceId: (characterPart[prop]) ? part.Choices[character[characterPart[prop]]].Id : part.Choices[0].Id
        };
        ret.push(newOption);
    }

    return ret;
}

/**
 *
 * @param {int} race
 * @param {int} gender
 * @return {string}
 */
function characterGenderRaceToModel(race, gender) {
    const retGender = (gender === 1) ? `female` : `male`;
    return raceNumberToName(race) + retGender;
}

/**
 * Returns the race name from race number
 * @param {int} race
 * @return {string}
 */
function raceNumberToName(race) {
    return {
        1: `human`,
        2: `orc`,
        3: `dwarf`,
        4: `nightelf`,
        5: `scourge`,
        6: `tauren`,
        7: `gnome`,
        8: `troll`,
        10: `bloodelf`,
        11: `draenei`
    }[race];
}

export {
    findRaceGenderOptions,
    generateModels,
    raceNumberToName,
    getDisplaySlot,
    findItemsInEquipments
};