import { Expect, Equal } from "../test";

/**
 * **Christmas Cookie Inventory**
 *
 * Phew! Yesterday's tactic worked. Santa got down-and-dirty with the elves on the factory floor and they seem to have stopped planning their strike.
 *
 * With one small exception.. Unfortunately, two pesky elves (Jingle and Jangle) have realized that the 300 year stock options vesting cliff that Santa put into the elves' contract isn't quite typical. Jingle and Jangle already joined forces with Hermey (who has nothing to lose because he'd rather be a dentist than make toys) and they're beginning to cause a fuss.
 *
 * Santa noticed that a lot of this discussion is happening during cookie inventory. Help Santa speed up the process so these conversations are cut short.
 *
 * Take a look at the `cookieInventory` variable in the tests. Your goal is to update `CookieSurveyInput` so that it will return a union of all of the names of the various different cookies.
 *
 * Good luck! As Santa always says: "your hard work will pay off eventually, just be patient".
 */
type CookieSurveyInput<T> = keyof T;

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

const cookieInventory = {
    chocolate: 1,
    sugar: 20,
    gingerBread: 10,
    peanutButter: 30,
    snickeDoodle: 73,
};
type test_cookies_actual = CookieSurveyInput<typeof cookieInventory>;
//   ^?
type test_cookies_expected = "chocolate" | "sugar" | "gingerBread" | "peanutButter" | "snickeDoodle";
type test_cookies = Expect<Equal<test_cookies_actual, test_cookies_expected>>;

const unrelated = {
    hi: 1,
    hi2: 1,
    hi3: 1,
    hi4: 1,
    hi5: 1,
    hi6: 1,
    hi7: 1,
};
type test_unrelated_actual = CookieSurveyInput<typeof unrelated>;
//   ^?
type test_unrealted_expected = "hi" | "hi2" | "hi3" | "hi4" | "hi5" | "hi6" | "hi7";
type test_unrelated = Expect<Equal<test_unrelated_actual, test_unrealted_expected>>;
