
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model achievements
 * 
 */
export type achievements = $Result.DefaultSelection<Prisma.$achievementsPayload>
/**
 * Model chat_history
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type chat_history = $Result.DefaultSelection<Prisma.$chat_historyPayload>
/**
 * Model chat_sessions
 * 
 */
export type chat_sessions = $Result.DefaultSelection<Prisma.$chat_sessionsPayload>
/**
 * Model classes
 * 
 */
export type classes = $Result.DefaultSelection<Prisma.$classesPayload>
/**
 * Model daily_topic_metrics
 * 
 */
export type daily_topic_metrics = $Result.DefaultSelection<Prisma.$daily_topic_metricsPayload>
/**
 * Model friend_requests
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type friend_requests = $Result.DefaultSelection<Prisma.$friend_requestsPayload>
/**
 * Model friends
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type friends = $Result.DefaultSelection<Prisma.$friendsPayload>
/**
 * Model topics
 * 
 */
export type topics = $Result.DefaultSelection<Prisma.$topicsPayload>
/**
 * Model user_achievements
 * 
 */
export type user_achievements = $Result.DefaultSelection<Prisma.$user_achievementsPayload>
/**
 * Model xp_system
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type xp_system = $Result.DefaultSelection<Prisma.$xp_systemPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Achievements
 * const achievements = await prisma.achievements.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Achievements
   * const achievements = await prisma.achievements.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.achievements`: Exposes CRUD operations for the **achievements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievements.findMany()
    * ```
    */
  get achievements(): Prisma.achievementsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chat_history`: Exposes CRUD operations for the **chat_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chat_histories
    * const chat_histories = await prisma.chat_history.findMany()
    * ```
    */
  get chat_history(): Prisma.chat_historyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chat_sessions`: Exposes CRUD operations for the **chat_sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chat_sessions
    * const chat_sessions = await prisma.chat_sessions.findMany()
    * ```
    */
  get chat_sessions(): Prisma.chat_sessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.classes`: Exposes CRUD operations for the **classes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.classes.findMany()
    * ```
    */
  get classes(): Prisma.classesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.daily_topic_metrics`: Exposes CRUD operations for the **daily_topic_metrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Daily_topic_metrics
    * const daily_topic_metrics = await prisma.daily_topic_metrics.findMany()
    * ```
    */
  get daily_topic_metrics(): Prisma.daily_topic_metricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friend_requests`: Exposes CRUD operations for the **friend_requests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friend_requests
    * const friend_requests = await prisma.friend_requests.findMany()
    * ```
    */
  get friend_requests(): Prisma.friend_requestsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friends`: Exposes CRUD operations for the **friends** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friends
    * const friends = await prisma.friends.findMany()
    * ```
    */
  get friends(): Prisma.friendsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.topics`: Exposes CRUD operations for the **topics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Topics
    * const topics = await prisma.topics.findMany()
    * ```
    */
  get topics(): Prisma.topicsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_achievements`: Exposes CRUD operations for the **user_achievements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_achievements
    * const user_achievements = await prisma.user_achievements.findMany()
    * ```
    */
  get user_achievements(): Prisma.user_achievementsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.xp_system`: Exposes CRUD operations for the **xp_system** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Xp_systems
    * const xp_systems = await prisma.xp_system.findMany()
    * ```
    */
  get xp_system(): Prisma.xp_systemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    achievements: 'achievements',
    chat_history: 'chat_history',
    chat_sessions: 'chat_sessions',
    classes: 'classes',
    daily_topic_metrics: 'daily_topic_metrics',
    friend_requests: 'friend_requests',
    friends: 'friends',
    topics: 'topics',
    user_achievements: 'user_achievements',
    xp_system: 'xp_system',
    User: 'User',
    Account: 'Account'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "achievements" | "chat_history" | "chat_sessions" | "classes" | "daily_topic_metrics" | "friend_requests" | "friends" | "topics" | "user_achievements" | "xp_system" | "user" | "account"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      achievements: {
        payload: Prisma.$achievementsPayload<ExtArgs>
        fields: Prisma.achievementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.achievementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.achievementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          findFirst: {
            args: Prisma.achievementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.achievementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          findMany: {
            args: Prisma.achievementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>[]
          }
          create: {
            args: Prisma.achievementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          createMany: {
            args: Prisma.achievementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.achievementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>[]
          }
          delete: {
            args: Prisma.achievementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          update: {
            args: Prisma.achievementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          deleteMany: {
            args: Prisma.achievementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.achievementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.achievementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>[]
          }
          upsert: {
            args: Prisma.achievementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          aggregate: {
            args: Prisma.AchievementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievements>
          }
          groupBy: {
            args: Prisma.achievementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.achievementsCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementsCountAggregateOutputType> | number
          }
        }
      }
      chat_history: {
        payload: Prisma.$chat_historyPayload<ExtArgs>
        fields: Prisma.chat_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chat_historyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chat_historyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>
          }
          findFirst: {
            args: Prisma.chat_historyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chat_historyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>
          }
          findMany: {
            args: Prisma.chat_historyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>[]
          }
          create: {
            args: Prisma.chat_historyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>
          }
          createMany: {
            args: Prisma.chat_historyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.chat_historyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>[]
          }
          delete: {
            args: Prisma.chat_historyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>
          }
          update: {
            args: Prisma.chat_historyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>
          }
          deleteMany: {
            args: Prisma.chat_historyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chat_historyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.chat_historyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>[]
          }
          upsert: {
            args: Prisma.chat_historyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_historyPayload>
          }
          aggregate: {
            args: Prisma.Chat_historyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat_history>
          }
          groupBy: {
            args: Prisma.chat_historyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Chat_historyGroupByOutputType>[]
          }
          count: {
            args: Prisma.chat_historyCountArgs<ExtArgs>
            result: $Utils.Optional<Chat_historyCountAggregateOutputType> | number
          }
        }
      }
      chat_sessions: {
        payload: Prisma.$chat_sessionsPayload<ExtArgs>
        fields: Prisma.chat_sessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chat_sessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chat_sessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>
          }
          findFirst: {
            args: Prisma.chat_sessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chat_sessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>
          }
          findMany: {
            args: Prisma.chat_sessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>[]
          }
          create: {
            args: Prisma.chat_sessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>
          }
          createMany: {
            args: Prisma.chat_sessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.chat_sessionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>[]
          }
          delete: {
            args: Prisma.chat_sessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>
          }
          update: {
            args: Prisma.chat_sessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>
          }
          deleteMany: {
            args: Prisma.chat_sessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chat_sessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.chat_sessionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>[]
          }
          upsert: {
            args: Prisma.chat_sessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chat_sessionsPayload>
          }
          aggregate: {
            args: Prisma.Chat_sessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat_sessions>
          }
          groupBy: {
            args: Prisma.chat_sessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Chat_sessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.chat_sessionsCountArgs<ExtArgs>
            result: $Utils.Optional<Chat_sessionsCountAggregateOutputType> | number
          }
        }
      }
      classes: {
        payload: Prisma.$classesPayload<ExtArgs>
        fields: Prisma.classesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.classesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.classesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>
          }
          findFirst: {
            args: Prisma.classesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.classesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>
          }
          findMany: {
            args: Prisma.classesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>[]
          }
          create: {
            args: Prisma.classesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>
          }
          createMany: {
            args: Prisma.classesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.classesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>[]
          }
          delete: {
            args: Prisma.classesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>
          }
          update: {
            args: Prisma.classesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>
          }
          deleteMany: {
            args: Prisma.classesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.classesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.classesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>[]
          }
          upsert: {
            args: Prisma.classesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$classesPayload>
          }
          aggregate: {
            args: Prisma.ClassesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClasses>
          }
          groupBy: {
            args: Prisma.classesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassesGroupByOutputType>[]
          }
          count: {
            args: Prisma.classesCountArgs<ExtArgs>
            result: $Utils.Optional<ClassesCountAggregateOutputType> | number
          }
        }
      }
      daily_topic_metrics: {
        payload: Prisma.$daily_topic_metricsPayload<ExtArgs>
        fields: Prisma.daily_topic_metricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.daily_topic_metricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.daily_topic_metricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>
          }
          findFirst: {
            args: Prisma.daily_topic_metricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.daily_topic_metricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>
          }
          findMany: {
            args: Prisma.daily_topic_metricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>[]
          }
          create: {
            args: Prisma.daily_topic_metricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>
          }
          createMany: {
            args: Prisma.daily_topic_metricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.daily_topic_metricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>[]
          }
          delete: {
            args: Prisma.daily_topic_metricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>
          }
          update: {
            args: Prisma.daily_topic_metricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>
          }
          deleteMany: {
            args: Prisma.daily_topic_metricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.daily_topic_metricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.daily_topic_metricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>[]
          }
          upsert: {
            args: Prisma.daily_topic_metricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$daily_topic_metricsPayload>
          }
          aggregate: {
            args: Prisma.Daily_topic_metricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDaily_topic_metrics>
          }
          groupBy: {
            args: Prisma.daily_topic_metricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Daily_topic_metricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.daily_topic_metricsCountArgs<ExtArgs>
            result: $Utils.Optional<Daily_topic_metricsCountAggregateOutputType> | number
          }
        }
      }
      friend_requests: {
        payload: Prisma.$friend_requestsPayload<ExtArgs>
        fields: Prisma.friend_requestsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.friend_requestsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.friend_requestsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>
          }
          findFirst: {
            args: Prisma.friend_requestsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.friend_requestsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>
          }
          findMany: {
            args: Prisma.friend_requestsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>[]
          }
          create: {
            args: Prisma.friend_requestsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>
          }
          createMany: {
            args: Prisma.friend_requestsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.friend_requestsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>[]
          }
          delete: {
            args: Prisma.friend_requestsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>
          }
          update: {
            args: Prisma.friend_requestsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>
          }
          deleteMany: {
            args: Prisma.friend_requestsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.friend_requestsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.friend_requestsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>[]
          }
          upsert: {
            args: Prisma.friend_requestsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friend_requestsPayload>
          }
          aggregate: {
            args: Prisma.Friend_requestsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriend_requests>
          }
          groupBy: {
            args: Prisma.friend_requestsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Friend_requestsGroupByOutputType>[]
          }
          count: {
            args: Prisma.friend_requestsCountArgs<ExtArgs>
            result: $Utils.Optional<Friend_requestsCountAggregateOutputType> | number
          }
        }
      }
      friends: {
        payload: Prisma.$friendsPayload<ExtArgs>
        fields: Prisma.friendsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.friendsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.friendsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>
          }
          findFirst: {
            args: Prisma.friendsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.friendsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>
          }
          findMany: {
            args: Prisma.friendsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>[]
          }
          create: {
            args: Prisma.friendsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>
          }
          createMany: {
            args: Prisma.friendsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.friendsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>[]
          }
          delete: {
            args: Prisma.friendsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>
          }
          update: {
            args: Prisma.friendsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>
          }
          deleteMany: {
            args: Prisma.friendsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.friendsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.friendsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>[]
          }
          upsert: {
            args: Prisma.friendsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$friendsPayload>
          }
          aggregate: {
            args: Prisma.FriendsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriends>
          }
          groupBy: {
            args: Prisma.friendsGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendsGroupByOutputType>[]
          }
          count: {
            args: Prisma.friendsCountArgs<ExtArgs>
            result: $Utils.Optional<FriendsCountAggregateOutputType> | number
          }
        }
      }
      topics: {
        payload: Prisma.$topicsPayload<ExtArgs>
        fields: Prisma.topicsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.topicsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.topicsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>
          }
          findFirst: {
            args: Prisma.topicsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.topicsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>
          }
          findMany: {
            args: Prisma.topicsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>[]
          }
          create: {
            args: Prisma.topicsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>
          }
          createMany: {
            args: Prisma.topicsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.topicsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>[]
          }
          delete: {
            args: Prisma.topicsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>
          }
          update: {
            args: Prisma.topicsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>
          }
          deleteMany: {
            args: Prisma.topicsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.topicsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.topicsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>[]
          }
          upsert: {
            args: Prisma.topicsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicsPayload>
          }
          aggregate: {
            args: Prisma.TopicsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTopics>
          }
          groupBy: {
            args: Prisma.topicsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TopicsGroupByOutputType>[]
          }
          count: {
            args: Prisma.topicsCountArgs<ExtArgs>
            result: $Utils.Optional<TopicsCountAggregateOutputType> | number
          }
        }
      }
      user_achievements: {
        payload: Prisma.$user_achievementsPayload<ExtArgs>
        fields: Prisma.user_achievementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_achievementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_achievementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>
          }
          findFirst: {
            args: Prisma.user_achievementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_achievementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>
          }
          findMany: {
            args: Prisma.user_achievementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>[]
          }
          create: {
            args: Prisma.user_achievementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>
          }
          createMany: {
            args: Prisma.user_achievementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_achievementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>[]
          }
          delete: {
            args: Prisma.user_achievementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>
          }
          update: {
            args: Prisma.user_achievementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>
          }
          deleteMany: {
            args: Prisma.user_achievementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_achievementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_achievementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>[]
          }
          upsert: {
            args: Prisma.user_achievementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_achievementsPayload>
          }
          aggregate: {
            args: Prisma.User_achievementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_achievements>
          }
          groupBy: {
            args: Prisma.user_achievementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_achievementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_achievementsCountArgs<ExtArgs>
            result: $Utils.Optional<User_achievementsCountAggregateOutputType> | number
          }
        }
      }
      xp_system: {
        payload: Prisma.$xp_systemPayload<ExtArgs>
        fields: Prisma.xp_systemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.xp_systemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.xp_systemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>
          }
          findFirst: {
            args: Prisma.xp_systemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.xp_systemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>
          }
          findMany: {
            args: Prisma.xp_systemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>[]
          }
          create: {
            args: Prisma.xp_systemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>
          }
          createMany: {
            args: Prisma.xp_systemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.xp_systemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>[]
          }
          delete: {
            args: Prisma.xp_systemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>
          }
          update: {
            args: Prisma.xp_systemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>
          }
          deleteMany: {
            args: Prisma.xp_systemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.xp_systemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.xp_systemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>[]
          }
          upsert: {
            args: Prisma.xp_systemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$xp_systemPayload>
          }
          aggregate: {
            args: Prisma.Xp_systemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateXp_system>
          }
          groupBy: {
            args: Prisma.xp_systemGroupByArgs<ExtArgs>
            result: $Utils.Optional<Xp_systemGroupByOutputType>[]
          }
          count: {
            args: Prisma.xp_systemCountArgs<ExtArgs>
            result: $Utils.Optional<Xp_systemCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    achievements?: achievementsOmit
    chat_history?: chat_historyOmit
    chat_sessions?: chat_sessionsOmit
    classes?: classesOmit
    daily_topic_metrics?: daily_topic_metricsOmit
    friend_requests?: friend_requestsOmit
    friends?: friendsOmit
    topics?: topicsOmit
    user_achievements?: user_achievementsOmit
    xp_system?: xp_systemOmit
    user?: UserOmit
    account?: AccountOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AchievementsCountOutputType
   */

  export type AchievementsCountOutputType = {
    user_achievements: number
  }

  export type AchievementsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_achievements?: boolean | AchievementsCountOutputTypeCountUser_achievementsArgs
  }

  // Custom InputTypes
  /**
   * AchievementsCountOutputType without action
   */
  export type AchievementsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AchievementsCountOutputType
     */
    select?: AchievementsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AchievementsCountOutputType without action
   */
  export type AchievementsCountOutputTypeCountUser_achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_achievementsWhereInput
  }


  /**
   * Count Type Chat_sessionsCountOutputType
   */

  export type Chat_sessionsCountOutputType = {
    chat_history: number
  }

  export type Chat_sessionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_history?: boolean | Chat_sessionsCountOutputTypeCountChat_historyArgs
  }

  // Custom InputTypes
  /**
   * Chat_sessionsCountOutputType without action
   */
  export type Chat_sessionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat_sessionsCountOutputType
     */
    select?: Chat_sessionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Chat_sessionsCountOutputType without action
   */
  export type Chat_sessionsCountOutputTypeCountChat_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chat_historyWhereInput
  }


  /**
   * Count Type ClassesCountOutputType
   */

  export type ClassesCountOutputType = {
    chat_sessions: number
    daily_topic_metrics: number
    topics: number
  }

  export type ClassesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | ClassesCountOutputTypeCountChat_sessionsArgs
    daily_topic_metrics?: boolean | ClassesCountOutputTypeCountDaily_topic_metricsArgs
    topics?: boolean | ClassesCountOutputTypeCountTopicsArgs
  }

  // Custom InputTypes
  /**
   * ClassesCountOutputType without action
   */
  export type ClassesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassesCountOutputType
     */
    select?: ClassesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassesCountOutputType without action
   */
  export type ClassesCountOutputTypeCountChat_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chat_sessionsWhereInput
  }

  /**
   * ClassesCountOutputType without action
   */
  export type ClassesCountOutputTypeCountDaily_topic_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: daily_topic_metricsWhereInput
  }

  /**
   * ClassesCountOutputType without action
   */
  export type ClassesCountOutputTypeCountTopicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: topicsWhereInput
  }


  /**
   * Count Type TopicsCountOutputType
   */

  export type TopicsCountOutputType = {
    chat_sessions: number
    daily_topic_metrics: number
  }

  export type TopicsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | TopicsCountOutputTypeCountChat_sessionsArgs
    daily_topic_metrics?: boolean | TopicsCountOutputTypeCountDaily_topic_metricsArgs
  }

  // Custom InputTypes
  /**
   * TopicsCountOutputType without action
   */
  export type TopicsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicsCountOutputType
     */
    select?: TopicsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TopicsCountOutputType without action
   */
  export type TopicsCountOutputTypeCountChat_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chat_sessionsWhereInput
  }

  /**
   * TopicsCountOutputType without action
   */
  export type TopicsCountOutputTypeCountDaily_topic_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: daily_topic_metricsWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Account: number
    chat_sessions: number
    daily_topic_metrics: number
    friend_requests_friend_requests_receiver_idTousers: number
    friend_requests_friend_requests_sender_idTousers: number
    friends_friends_friend_idTousers: number
    friends_friends_user_idTousers: number
    user_achievements: number
    xp_system: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Account?: boolean | UserCountOutputTypeCountAccountArgs
    chat_sessions?: boolean | UserCountOutputTypeCountChat_sessionsArgs
    daily_topic_metrics?: boolean | UserCountOutputTypeCountDaily_topic_metricsArgs
    friend_requests_friend_requests_receiver_idTousers?: boolean | UserCountOutputTypeCountFriend_requests_friend_requests_receiver_idTousersArgs
    friend_requests_friend_requests_sender_idTousers?: boolean | UserCountOutputTypeCountFriend_requests_friend_requests_sender_idTousersArgs
    friends_friends_friend_idTousers?: boolean | UserCountOutputTypeCountFriends_friends_friend_idTousersArgs
    friends_friends_user_idTousers?: boolean | UserCountOutputTypeCountFriends_friends_user_idTousersArgs
    user_achievements?: boolean | UserCountOutputTypeCountUser_achievementsArgs
    xp_system?: boolean | UserCountOutputTypeCountXp_systemArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChat_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chat_sessionsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDaily_topic_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: daily_topic_metricsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriend_requests_friend_requests_receiver_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: friend_requestsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriend_requests_friend_requests_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: friend_requestsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriends_friends_friend_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: friendsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriends_friends_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: friendsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUser_achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_achievementsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountXp_systemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: xp_systemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model achievements
   */

  export type AggregateAchievements = {
    _count: AchievementsCountAggregateOutputType | null
    _avg: AchievementsAvgAggregateOutputType | null
    _sum: AchievementsSumAggregateOutputType | null
    _min: AchievementsMinAggregateOutputType | null
    _max: AchievementsMaxAggregateOutputType | null
  }

  export type AchievementsAvgAggregateOutputType = {
    xp_reward: number | null
  }

  export type AchievementsSumAggregateOutputType = {
    xp_reward: number | null
  }

  export type AchievementsMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    xp_reward: number | null
    created_at: Date | null
  }

  export type AchievementsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    xp_reward: number | null
    created_at: Date | null
  }

  export type AchievementsCountAggregateOutputType = {
    id: number
    name: number
    description: number
    xp_reward: number
    created_at: number
    _all: number
  }


  export type AchievementsAvgAggregateInputType = {
    xp_reward?: true
  }

  export type AchievementsSumAggregateInputType = {
    xp_reward?: true
  }

  export type AchievementsMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    xp_reward?: true
    created_at?: true
  }

  export type AchievementsMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    xp_reward?: true
    created_at?: true
  }

  export type AchievementsCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    xp_reward?: true
    created_at?: true
    _all?: true
  }

  export type AchievementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which achievements to aggregate.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned achievements
    **/
    _count?: true | AchievementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementsMaxAggregateInputType
  }

  export type GetAchievementsAggregateType<T extends AchievementsAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievements[P]>
      : GetScalarType<T[P], AggregateAchievements[P]>
  }




  export type achievementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: achievementsWhereInput
    orderBy?: achievementsOrderByWithAggregationInput | achievementsOrderByWithAggregationInput[]
    by: AchievementsScalarFieldEnum[] | AchievementsScalarFieldEnum
    having?: achievementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementsCountAggregateInputType | true
    _avg?: AchievementsAvgAggregateInputType
    _sum?: AchievementsSumAggregateInputType
    _min?: AchievementsMinAggregateInputType
    _max?: AchievementsMaxAggregateInputType
  }

  export type AchievementsGroupByOutputType = {
    id: string
    name: string
    description: string | null
    xp_reward: number | null
    created_at: Date | null
    _count: AchievementsCountAggregateOutputType | null
    _avg: AchievementsAvgAggregateOutputType | null
    _sum: AchievementsSumAggregateOutputType | null
    _min: AchievementsMinAggregateOutputType | null
    _max: AchievementsMaxAggregateOutputType | null
  }

  type GetAchievementsGroupByPayload<T extends achievementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementsGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementsGroupByOutputType[P]>
        }
      >
    >


  export type achievementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    xp_reward?: boolean
    created_at?: boolean
    user_achievements?: boolean | achievements$user_achievementsArgs<ExtArgs>
    _count?: boolean | AchievementsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievements"]>

  export type achievementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    xp_reward?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["achievements"]>

  export type achievementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    xp_reward?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["achievements"]>

  export type achievementsSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    xp_reward?: boolean
    created_at?: boolean
  }

  export type achievementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "xp_reward" | "created_at", ExtArgs["result"]["achievements"]>
  export type achievementsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_achievements?: boolean | achievements$user_achievementsArgs<ExtArgs>
    _count?: boolean | AchievementsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type achievementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type achievementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $achievementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "achievements"
    objects: {
      user_achievements: Prisma.$user_achievementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      xp_reward: number | null
      created_at: Date | null
    }, ExtArgs["result"]["achievements"]>
    composites: {}
  }

  type achievementsGetPayload<S extends boolean | null | undefined | achievementsDefaultArgs> = $Result.GetResult<Prisma.$achievementsPayload, S>

  type achievementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<achievementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementsCountAggregateInputType | true
    }

  export interface achievementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['achievements'], meta: { name: 'achievements' } }
    /**
     * Find zero or one Achievements that matches the filter.
     * @param {achievementsFindUniqueArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends achievementsFindUniqueArgs>(args: SelectSubset<T, achievementsFindUniqueArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {achievementsFindUniqueOrThrowArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends achievementsFindUniqueOrThrowArgs>(args: SelectSubset<T, achievementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsFindFirstArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends achievementsFindFirstArgs>(args?: SelectSubset<T, achievementsFindFirstArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsFindFirstOrThrowArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends achievementsFindFirstOrThrowArgs>(args?: SelectSubset<T, achievementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievements.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementsWithIdOnly = await prisma.achievements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends achievementsFindManyArgs>(args?: SelectSubset<T, achievementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievements.
     * @param {achievementsCreateArgs} args - Arguments to create a Achievements.
     * @example
     * // Create one Achievements
     * const Achievements = await prisma.achievements.create({
     *   data: {
     *     // ... data to create a Achievements
     *   }
     * })
     * 
     */
    create<T extends achievementsCreateArgs>(args: SelectSubset<T, achievementsCreateArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {achievementsCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievements = await prisma.achievements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends achievementsCreateManyArgs>(args?: SelectSubset<T, achievementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {achievementsCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievements = await prisma.achievements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementsWithIdOnly = await prisma.achievements.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends achievementsCreateManyAndReturnArgs>(args?: SelectSubset<T, achievementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Achievements.
     * @param {achievementsDeleteArgs} args - Arguments to delete one Achievements.
     * @example
     * // Delete one Achievements
     * const Achievements = await prisma.achievements.delete({
     *   where: {
     *     // ... filter to delete one Achievements
     *   }
     * })
     * 
     */
    delete<T extends achievementsDeleteArgs>(args: SelectSubset<T, achievementsDeleteArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievements.
     * @param {achievementsUpdateArgs} args - Arguments to update one Achievements.
     * @example
     * // Update one Achievements
     * const achievements = await prisma.achievements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends achievementsUpdateArgs>(args: SelectSubset<T, achievementsUpdateArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {achievementsDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends achievementsDeleteManyArgs>(args?: SelectSubset<T, achievementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievements = await prisma.achievements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends achievementsUpdateManyArgs>(args: SelectSubset<T, achievementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {achievementsUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievements = await prisma.achievements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Achievements and only return the `id`
     * const achievementsWithIdOnly = await prisma.achievements.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends achievementsUpdateManyAndReturnArgs>(args: SelectSubset<T, achievementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Achievements.
     * @param {achievementsUpsertArgs} args - Arguments to update or create a Achievements.
     * @example
     * // Update or create a Achievements
     * const achievements = await prisma.achievements.upsert({
     *   create: {
     *     // ... data to create a Achievements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievements we want to update
     *   }
     * })
     */
    upsert<T extends achievementsUpsertArgs>(args: SelectSubset<T, achievementsUpsertArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievements.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends achievementsCountArgs>(
      args?: Subset<T, achievementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementsAggregateArgs>(args: Subset<T, AchievementsAggregateArgs>): Prisma.PrismaPromise<GetAchievementsAggregateType<T>>

    /**
     * Group by Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends achievementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: achievementsGroupByArgs['orderBy'] }
        : { orderBy?: achievementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, achievementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the achievements model
   */
  readonly fields: achievementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for achievements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__achievementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_achievements<T extends achievements$user_achievementsArgs<ExtArgs> = {}>(args?: Subset<T, achievements$user_achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the achievements model
   */
  interface achievementsFieldRefs {
    readonly id: FieldRef<"achievements", 'String'>
    readonly name: FieldRef<"achievements", 'String'>
    readonly description: FieldRef<"achievements", 'String'>
    readonly xp_reward: FieldRef<"achievements", 'Int'>
    readonly created_at: FieldRef<"achievements", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * achievements findUnique
   */
  export type achievementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements findUniqueOrThrow
   */
  export type achievementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements findFirst
   */
  export type achievementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for achievements.
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of achievements.
     */
    distinct?: AchievementsScalarFieldEnum | AchievementsScalarFieldEnum[]
  }

  /**
   * achievements findFirstOrThrow
   */
  export type achievementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for achievements.
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of achievements.
     */
    distinct?: AchievementsScalarFieldEnum | AchievementsScalarFieldEnum[]
  }

  /**
   * achievements findMany
   */
  export type achievementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing achievements.
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of achievements.
     */
    distinct?: AchievementsScalarFieldEnum | AchievementsScalarFieldEnum[]
  }

  /**
   * achievements create
   */
  export type achievementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * The data needed to create a achievements.
     */
    data: XOR<achievementsCreateInput, achievementsUncheckedCreateInput>
  }

  /**
   * achievements createMany
   */
  export type achievementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many achievements.
     */
    data: achievementsCreateManyInput | achievementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * achievements createManyAndReturn
   */
  export type achievementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * The data used to create many achievements.
     */
    data: achievementsCreateManyInput | achievementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * achievements update
   */
  export type achievementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * The data needed to update a achievements.
     */
    data: XOR<achievementsUpdateInput, achievementsUncheckedUpdateInput>
    /**
     * Choose, which achievements to update.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements updateMany
   */
  export type achievementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update achievements.
     */
    data: XOR<achievementsUpdateManyMutationInput, achievementsUncheckedUpdateManyInput>
    /**
     * Filter which achievements to update
     */
    where?: achievementsWhereInput
    /**
     * Limit how many achievements to update.
     */
    limit?: number
  }

  /**
   * achievements updateManyAndReturn
   */
  export type achievementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * The data used to update achievements.
     */
    data: XOR<achievementsUpdateManyMutationInput, achievementsUncheckedUpdateManyInput>
    /**
     * Filter which achievements to update
     */
    where?: achievementsWhereInput
    /**
     * Limit how many achievements to update.
     */
    limit?: number
  }

  /**
   * achievements upsert
   */
  export type achievementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * The filter to search for the achievements to update in case it exists.
     */
    where: achievementsWhereUniqueInput
    /**
     * In case the achievements found by the `where` argument doesn't exist, create a new achievements with this data.
     */
    create: XOR<achievementsCreateInput, achievementsUncheckedCreateInput>
    /**
     * In case the achievements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<achievementsUpdateInput, achievementsUncheckedUpdateInput>
  }

  /**
   * achievements delete
   */
  export type achievementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
    /**
     * Filter which achievements to delete.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements deleteMany
   */
  export type achievementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which achievements to delete
     */
    where?: achievementsWhereInput
    /**
     * Limit how many achievements to delete.
     */
    limit?: number
  }

  /**
   * achievements.user_achievements
   */
  export type achievements$user_achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    where?: user_achievementsWhereInput
    orderBy?: user_achievementsOrderByWithRelationInput | user_achievementsOrderByWithRelationInput[]
    cursor?: user_achievementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_achievementsScalarFieldEnum | User_achievementsScalarFieldEnum[]
  }

  /**
   * achievements without action
   */
  export type achievementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: achievementsInclude<ExtArgs> | null
  }


  /**
   * Model chat_history
   */

  export type AggregateChat_history = {
    _count: Chat_historyCountAggregateOutputType | null
    _min: Chat_historyMinAggregateOutputType | null
    _max: Chat_historyMaxAggregateOutputType | null
  }

  export type Chat_historyMinAggregateOutputType = {
    id: string | null
    session_id: string | null
    sender: string | null
    content: string | null
    created_at: Date | null
  }

  export type Chat_historyMaxAggregateOutputType = {
    id: string | null
    session_id: string | null
    sender: string | null
    content: string | null
    created_at: Date | null
  }

  export type Chat_historyCountAggregateOutputType = {
    id: number
    session_id: number
    sender: number
    content: number
    created_at: number
    _all: number
  }


  export type Chat_historyMinAggregateInputType = {
    id?: true
    session_id?: true
    sender?: true
    content?: true
    created_at?: true
  }

  export type Chat_historyMaxAggregateInputType = {
    id?: true
    session_id?: true
    sender?: true
    content?: true
    created_at?: true
  }

  export type Chat_historyCountAggregateInputType = {
    id?: true
    session_id?: true
    sender?: true
    content?: true
    created_at?: true
    _all?: true
  }

  export type Chat_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chat_history to aggregate.
     */
    where?: chat_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_histories to fetch.
     */
    orderBy?: chat_historyOrderByWithRelationInput | chat_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chat_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chat_histories
    **/
    _count?: true | Chat_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Chat_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Chat_historyMaxAggregateInputType
  }

  export type GetChat_historyAggregateType<T extends Chat_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateChat_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat_history[P]>
      : GetScalarType<T[P], AggregateChat_history[P]>
  }




  export type chat_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chat_historyWhereInput
    orderBy?: chat_historyOrderByWithAggregationInput | chat_historyOrderByWithAggregationInput[]
    by: Chat_historyScalarFieldEnum[] | Chat_historyScalarFieldEnum
    having?: chat_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Chat_historyCountAggregateInputType | true
    _min?: Chat_historyMinAggregateInputType
    _max?: Chat_historyMaxAggregateInputType
  }

  export type Chat_historyGroupByOutputType = {
    id: string
    session_id: string
    sender: string
    content: string
    created_at: Date | null
    _count: Chat_historyCountAggregateOutputType | null
    _min: Chat_historyMinAggregateOutputType | null
    _max: Chat_historyMaxAggregateOutputType | null
  }

  type GetChat_historyGroupByPayload<T extends chat_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Chat_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Chat_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Chat_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Chat_historyGroupByOutputType[P]>
        }
      >
    >


  export type chat_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    sender?: boolean
    content?: boolean
    created_at?: boolean
    chat_sessions?: boolean | chat_sessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat_history"]>

  export type chat_historySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    sender?: boolean
    content?: boolean
    created_at?: boolean
    chat_sessions?: boolean | chat_sessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat_history"]>

  export type chat_historySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    sender?: boolean
    content?: boolean
    created_at?: boolean
    chat_sessions?: boolean | chat_sessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat_history"]>

  export type chat_historySelectScalar = {
    id?: boolean
    session_id?: boolean
    sender?: boolean
    content?: boolean
    created_at?: boolean
  }

  export type chat_historyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "session_id" | "sender" | "content" | "created_at", ExtArgs["result"]["chat_history"]>
  export type chat_historyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | chat_sessionsDefaultArgs<ExtArgs>
  }
  export type chat_historyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | chat_sessionsDefaultArgs<ExtArgs>
  }
  export type chat_historyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | chat_sessionsDefaultArgs<ExtArgs>
  }

  export type $chat_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chat_history"
    objects: {
      chat_sessions: Prisma.$chat_sessionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      session_id: string
      sender: string
      content: string
      created_at: Date | null
    }, ExtArgs["result"]["chat_history"]>
    composites: {}
  }

  type chat_historyGetPayload<S extends boolean | null | undefined | chat_historyDefaultArgs> = $Result.GetResult<Prisma.$chat_historyPayload, S>

  type chat_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chat_historyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Chat_historyCountAggregateInputType | true
    }

  export interface chat_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chat_history'], meta: { name: 'chat_history' } }
    /**
     * Find zero or one Chat_history that matches the filter.
     * @param {chat_historyFindUniqueArgs} args - Arguments to find a Chat_history
     * @example
     * // Get one Chat_history
     * const chat_history = await prisma.chat_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chat_historyFindUniqueArgs>(args: SelectSubset<T, chat_historyFindUniqueArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat_history that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chat_historyFindUniqueOrThrowArgs} args - Arguments to find a Chat_history
     * @example
     * // Get one Chat_history
     * const chat_history = await prisma.chat_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chat_historyFindUniqueOrThrowArgs>(args: SelectSubset<T, chat_historyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_historyFindFirstArgs} args - Arguments to find a Chat_history
     * @example
     * // Get one Chat_history
     * const chat_history = await prisma.chat_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chat_historyFindFirstArgs>(args?: SelectSubset<T, chat_historyFindFirstArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_historyFindFirstOrThrowArgs} args - Arguments to find a Chat_history
     * @example
     * // Get one Chat_history
     * const chat_history = await prisma.chat_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chat_historyFindFirstOrThrowArgs>(args?: SelectSubset<T, chat_historyFindFirstOrThrowArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chat_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chat_histories
     * const chat_histories = await prisma.chat_history.findMany()
     * 
     * // Get first 10 Chat_histories
     * const chat_histories = await prisma.chat_history.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chat_historyWithIdOnly = await prisma.chat_history.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends chat_historyFindManyArgs>(args?: SelectSubset<T, chat_historyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat_history.
     * @param {chat_historyCreateArgs} args - Arguments to create a Chat_history.
     * @example
     * // Create one Chat_history
     * const Chat_history = await prisma.chat_history.create({
     *   data: {
     *     // ... data to create a Chat_history
     *   }
     * })
     * 
     */
    create<T extends chat_historyCreateArgs>(args: SelectSubset<T, chat_historyCreateArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chat_histories.
     * @param {chat_historyCreateManyArgs} args - Arguments to create many Chat_histories.
     * @example
     * // Create many Chat_histories
     * const chat_history = await prisma.chat_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chat_historyCreateManyArgs>(args?: SelectSubset<T, chat_historyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chat_histories and returns the data saved in the database.
     * @param {chat_historyCreateManyAndReturnArgs} args - Arguments to create many Chat_histories.
     * @example
     * // Create many Chat_histories
     * const chat_history = await prisma.chat_history.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chat_histories and only return the `id`
     * const chat_historyWithIdOnly = await prisma.chat_history.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends chat_historyCreateManyAndReturnArgs>(args?: SelectSubset<T, chat_historyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat_history.
     * @param {chat_historyDeleteArgs} args - Arguments to delete one Chat_history.
     * @example
     * // Delete one Chat_history
     * const Chat_history = await prisma.chat_history.delete({
     *   where: {
     *     // ... filter to delete one Chat_history
     *   }
     * })
     * 
     */
    delete<T extends chat_historyDeleteArgs>(args: SelectSubset<T, chat_historyDeleteArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat_history.
     * @param {chat_historyUpdateArgs} args - Arguments to update one Chat_history.
     * @example
     * // Update one Chat_history
     * const chat_history = await prisma.chat_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chat_historyUpdateArgs>(args: SelectSubset<T, chat_historyUpdateArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chat_histories.
     * @param {chat_historyDeleteManyArgs} args - Arguments to filter Chat_histories to delete.
     * @example
     * // Delete a few Chat_histories
     * const { count } = await prisma.chat_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chat_historyDeleteManyArgs>(args?: SelectSubset<T, chat_historyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chat_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chat_histories
     * const chat_history = await prisma.chat_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chat_historyUpdateManyArgs>(args: SelectSubset<T, chat_historyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chat_histories and returns the data updated in the database.
     * @param {chat_historyUpdateManyAndReturnArgs} args - Arguments to update many Chat_histories.
     * @example
     * // Update many Chat_histories
     * const chat_history = await prisma.chat_history.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chat_histories and only return the `id`
     * const chat_historyWithIdOnly = await prisma.chat_history.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends chat_historyUpdateManyAndReturnArgs>(args: SelectSubset<T, chat_historyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat_history.
     * @param {chat_historyUpsertArgs} args - Arguments to update or create a Chat_history.
     * @example
     * // Update or create a Chat_history
     * const chat_history = await prisma.chat_history.upsert({
     *   create: {
     *     // ... data to create a Chat_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat_history we want to update
     *   }
     * })
     */
    upsert<T extends chat_historyUpsertArgs>(args: SelectSubset<T, chat_historyUpsertArgs<ExtArgs>>): Prisma__chat_historyClient<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chat_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_historyCountArgs} args - Arguments to filter Chat_histories to count.
     * @example
     * // Count the number of Chat_histories
     * const count = await prisma.chat_history.count({
     *   where: {
     *     // ... the filter for the Chat_histories we want to count
     *   }
     * })
    **/
    count<T extends chat_historyCountArgs>(
      args?: Subset<T, chat_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Chat_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Chat_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Chat_historyAggregateArgs>(args: Subset<T, Chat_historyAggregateArgs>): Prisma.PrismaPromise<GetChat_historyAggregateType<T>>

    /**
     * Group by Chat_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_historyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends chat_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chat_historyGroupByArgs['orderBy'] }
        : { orderBy?: chat_historyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, chat_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChat_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chat_history model
   */
  readonly fields: chat_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chat_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chat_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat_sessions<T extends chat_sessionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, chat_sessionsDefaultArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the chat_history model
   */
  interface chat_historyFieldRefs {
    readonly id: FieldRef<"chat_history", 'String'>
    readonly session_id: FieldRef<"chat_history", 'String'>
    readonly sender: FieldRef<"chat_history", 'String'>
    readonly content: FieldRef<"chat_history", 'String'>
    readonly created_at: FieldRef<"chat_history", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chat_history findUnique
   */
  export type chat_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * Filter, which chat_history to fetch.
     */
    where: chat_historyWhereUniqueInput
  }

  /**
   * chat_history findUniqueOrThrow
   */
  export type chat_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * Filter, which chat_history to fetch.
     */
    where: chat_historyWhereUniqueInput
  }

  /**
   * chat_history findFirst
   */
  export type chat_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * Filter, which chat_history to fetch.
     */
    where?: chat_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_histories to fetch.
     */
    orderBy?: chat_historyOrderByWithRelationInput | chat_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chat_histories.
     */
    cursor?: chat_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chat_histories.
     */
    distinct?: Chat_historyScalarFieldEnum | Chat_historyScalarFieldEnum[]
  }

  /**
   * chat_history findFirstOrThrow
   */
  export type chat_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * Filter, which chat_history to fetch.
     */
    where?: chat_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_histories to fetch.
     */
    orderBy?: chat_historyOrderByWithRelationInput | chat_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chat_histories.
     */
    cursor?: chat_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chat_histories.
     */
    distinct?: Chat_historyScalarFieldEnum | Chat_historyScalarFieldEnum[]
  }

  /**
   * chat_history findMany
   */
  export type chat_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * Filter, which chat_histories to fetch.
     */
    where?: chat_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_histories to fetch.
     */
    orderBy?: chat_historyOrderByWithRelationInput | chat_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chat_histories.
     */
    cursor?: chat_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chat_histories.
     */
    distinct?: Chat_historyScalarFieldEnum | Chat_historyScalarFieldEnum[]
  }

  /**
   * chat_history create
   */
  export type chat_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * The data needed to create a chat_history.
     */
    data: XOR<chat_historyCreateInput, chat_historyUncheckedCreateInput>
  }

  /**
   * chat_history createMany
   */
  export type chat_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chat_histories.
     */
    data: chat_historyCreateManyInput | chat_historyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chat_history createManyAndReturn
   */
  export type chat_historyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * The data used to create many chat_histories.
     */
    data: chat_historyCreateManyInput | chat_historyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * chat_history update
   */
  export type chat_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * The data needed to update a chat_history.
     */
    data: XOR<chat_historyUpdateInput, chat_historyUncheckedUpdateInput>
    /**
     * Choose, which chat_history to update.
     */
    where: chat_historyWhereUniqueInput
  }

  /**
   * chat_history updateMany
   */
  export type chat_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chat_histories.
     */
    data: XOR<chat_historyUpdateManyMutationInput, chat_historyUncheckedUpdateManyInput>
    /**
     * Filter which chat_histories to update
     */
    where?: chat_historyWhereInput
    /**
     * Limit how many chat_histories to update.
     */
    limit?: number
  }

  /**
   * chat_history updateManyAndReturn
   */
  export type chat_historyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * The data used to update chat_histories.
     */
    data: XOR<chat_historyUpdateManyMutationInput, chat_historyUncheckedUpdateManyInput>
    /**
     * Filter which chat_histories to update
     */
    where?: chat_historyWhereInput
    /**
     * Limit how many chat_histories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * chat_history upsert
   */
  export type chat_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * The filter to search for the chat_history to update in case it exists.
     */
    where: chat_historyWhereUniqueInput
    /**
     * In case the chat_history found by the `where` argument doesn't exist, create a new chat_history with this data.
     */
    create: XOR<chat_historyCreateInput, chat_historyUncheckedCreateInput>
    /**
     * In case the chat_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chat_historyUpdateInput, chat_historyUncheckedUpdateInput>
  }

  /**
   * chat_history delete
   */
  export type chat_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    /**
     * Filter which chat_history to delete.
     */
    where: chat_historyWhereUniqueInput
  }

  /**
   * chat_history deleteMany
   */
  export type chat_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chat_histories to delete
     */
    where?: chat_historyWhereInput
    /**
     * Limit how many chat_histories to delete.
     */
    limit?: number
  }

  /**
   * chat_history without action
   */
  export type chat_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
  }


  /**
   * Model chat_sessions
   */

  export type AggregateChat_sessions = {
    _count: Chat_sessionsCountAggregateOutputType | null
    _min: Chat_sessionsMinAggregateOutputType | null
    _max: Chat_sessionsMaxAggregateOutputType | null
  }

  export type Chat_sessionsMinAggregateOutputType = {
    session_id: string | null
    class_code: string | null
    user_id: string | null
    topic_id: string | null
    started_at: Date | null
    created_at: Date | null
  }

  export type Chat_sessionsMaxAggregateOutputType = {
    session_id: string | null
    class_code: string | null
    user_id: string | null
    topic_id: string | null
    started_at: Date | null
    created_at: Date | null
  }

  export type Chat_sessionsCountAggregateOutputType = {
    session_id: number
    class_code: number
    user_id: number
    topic_id: number
    started_at: number
    created_at: number
    _all: number
  }


  export type Chat_sessionsMinAggregateInputType = {
    session_id?: true
    class_code?: true
    user_id?: true
    topic_id?: true
    started_at?: true
    created_at?: true
  }

  export type Chat_sessionsMaxAggregateInputType = {
    session_id?: true
    class_code?: true
    user_id?: true
    topic_id?: true
    started_at?: true
    created_at?: true
  }

  export type Chat_sessionsCountAggregateInputType = {
    session_id?: true
    class_code?: true
    user_id?: true
    topic_id?: true
    started_at?: true
    created_at?: true
    _all?: true
  }

  export type Chat_sessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chat_sessions to aggregate.
     */
    where?: chat_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_sessions to fetch.
     */
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chat_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chat_sessions
    **/
    _count?: true | Chat_sessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Chat_sessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Chat_sessionsMaxAggregateInputType
  }

  export type GetChat_sessionsAggregateType<T extends Chat_sessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateChat_sessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat_sessions[P]>
      : GetScalarType<T[P], AggregateChat_sessions[P]>
  }




  export type chat_sessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chat_sessionsWhereInput
    orderBy?: chat_sessionsOrderByWithAggregationInput | chat_sessionsOrderByWithAggregationInput[]
    by: Chat_sessionsScalarFieldEnum[] | Chat_sessionsScalarFieldEnum
    having?: chat_sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Chat_sessionsCountAggregateInputType | true
    _min?: Chat_sessionsMinAggregateInputType
    _max?: Chat_sessionsMaxAggregateInputType
  }

  export type Chat_sessionsGroupByOutputType = {
    session_id: string
    class_code: string
    user_id: string
    topic_id: string
    started_at: Date | null
    created_at: Date | null
    _count: Chat_sessionsCountAggregateOutputType | null
    _min: Chat_sessionsMinAggregateOutputType | null
    _max: Chat_sessionsMaxAggregateOutputType | null
  }

  type GetChat_sessionsGroupByPayload<T extends chat_sessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Chat_sessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Chat_sessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Chat_sessionsGroupByOutputType[P]>
            : GetScalarType<T[P], Chat_sessionsGroupByOutputType[P]>
        }
      >
    >


  export type chat_sessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    class_code?: boolean
    user_id?: boolean
    topic_id?: boolean
    started_at?: boolean
    created_at?: boolean
    chat_history?: boolean | chat_sessions$chat_historyArgs<ExtArgs>
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | Chat_sessionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat_sessions"]>

  export type chat_sessionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    class_code?: boolean
    user_id?: boolean
    topic_id?: boolean
    started_at?: boolean
    created_at?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat_sessions"]>

  export type chat_sessionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    session_id?: boolean
    class_code?: boolean
    user_id?: boolean
    topic_id?: boolean
    started_at?: boolean
    created_at?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat_sessions"]>

  export type chat_sessionsSelectScalar = {
    session_id?: boolean
    class_code?: boolean
    user_id?: boolean
    topic_id?: boolean
    started_at?: boolean
    created_at?: boolean
  }

  export type chat_sessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"session_id" | "class_code" | "user_id" | "topic_id" | "started_at" | "created_at", ExtArgs["result"]["chat_sessions"]>
  export type chat_sessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_history?: boolean | chat_sessions$chat_historyArgs<ExtArgs>
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | Chat_sessionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type chat_sessionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type chat_sessionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $chat_sessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chat_sessions"
    objects: {
      chat_history: Prisma.$chat_historyPayload<ExtArgs>[]
      classes: Prisma.$classesPayload<ExtArgs>
      topics: Prisma.$topicsPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      session_id: string
      class_code: string
      user_id: string
      topic_id: string
      started_at: Date | null
      created_at: Date | null
    }, ExtArgs["result"]["chat_sessions"]>
    composites: {}
  }

  type chat_sessionsGetPayload<S extends boolean | null | undefined | chat_sessionsDefaultArgs> = $Result.GetResult<Prisma.$chat_sessionsPayload, S>

  type chat_sessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chat_sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Chat_sessionsCountAggregateInputType | true
    }

  export interface chat_sessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chat_sessions'], meta: { name: 'chat_sessions' } }
    /**
     * Find zero or one Chat_sessions that matches the filter.
     * @param {chat_sessionsFindUniqueArgs} args - Arguments to find a Chat_sessions
     * @example
     * // Get one Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chat_sessionsFindUniqueArgs>(args: SelectSubset<T, chat_sessionsFindUniqueArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat_sessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chat_sessionsFindUniqueOrThrowArgs} args - Arguments to find a Chat_sessions
     * @example
     * // Get one Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chat_sessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, chat_sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_sessionsFindFirstArgs} args - Arguments to find a Chat_sessions
     * @example
     * // Get one Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chat_sessionsFindFirstArgs>(args?: SelectSubset<T, chat_sessionsFindFirstArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat_sessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_sessionsFindFirstOrThrowArgs} args - Arguments to find a Chat_sessions
     * @example
     * // Get one Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chat_sessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, chat_sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chat_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_sessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.findMany()
     * 
     * // Get first 10 Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.findMany({ take: 10 })
     * 
     * // Only select the `session_id`
     * const chat_sessionsWithSession_idOnly = await prisma.chat_sessions.findMany({ select: { session_id: true } })
     * 
     */
    findMany<T extends chat_sessionsFindManyArgs>(args?: SelectSubset<T, chat_sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat_sessions.
     * @param {chat_sessionsCreateArgs} args - Arguments to create a Chat_sessions.
     * @example
     * // Create one Chat_sessions
     * const Chat_sessions = await prisma.chat_sessions.create({
     *   data: {
     *     // ... data to create a Chat_sessions
     *   }
     * })
     * 
     */
    create<T extends chat_sessionsCreateArgs>(args: SelectSubset<T, chat_sessionsCreateArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chat_sessions.
     * @param {chat_sessionsCreateManyArgs} args - Arguments to create many Chat_sessions.
     * @example
     * // Create many Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chat_sessionsCreateManyArgs>(args?: SelectSubset<T, chat_sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chat_sessions and returns the data saved in the database.
     * @param {chat_sessionsCreateManyAndReturnArgs} args - Arguments to create many Chat_sessions.
     * @example
     * // Create many Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chat_sessions and only return the `session_id`
     * const chat_sessionsWithSession_idOnly = await prisma.chat_sessions.createManyAndReturn({
     *   select: { session_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends chat_sessionsCreateManyAndReturnArgs>(args?: SelectSubset<T, chat_sessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat_sessions.
     * @param {chat_sessionsDeleteArgs} args - Arguments to delete one Chat_sessions.
     * @example
     * // Delete one Chat_sessions
     * const Chat_sessions = await prisma.chat_sessions.delete({
     *   where: {
     *     // ... filter to delete one Chat_sessions
     *   }
     * })
     * 
     */
    delete<T extends chat_sessionsDeleteArgs>(args: SelectSubset<T, chat_sessionsDeleteArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat_sessions.
     * @param {chat_sessionsUpdateArgs} args - Arguments to update one Chat_sessions.
     * @example
     * // Update one Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chat_sessionsUpdateArgs>(args: SelectSubset<T, chat_sessionsUpdateArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chat_sessions.
     * @param {chat_sessionsDeleteManyArgs} args - Arguments to filter Chat_sessions to delete.
     * @example
     * // Delete a few Chat_sessions
     * const { count } = await prisma.chat_sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chat_sessionsDeleteManyArgs>(args?: SelectSubset<T, chat_sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chat_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chat_sessionsUpdateManyArgs>(args: SelectSubset<T, chat_sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chat_sessions and returns the data updated in the database.
     * @param {chat_sessionsUpdateManyAndReturnArgs} args - Arguments to update many Chat_sessions.
     * @example
     * // Update many Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chat_sessions and only return the `session_id`
     * const chat_sessionsWithSession_idOnly = await prisma.chat_sessions.updateManyAndReturn({
     *   select: { session_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends chat_sessionsUpdateManyAndReturnArgs>(args: SelectSubset<T, chat_sessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat_sessions.
     * @param {chat_sessionsUpsertArgs} args - Arguments to update or create a Chat_sessions.
     * @example
     * // Update or create a Chat_sessions
     * const chat_sessions = await prisma.chat_sessions.upsert({
     *   create: {
     *     // ... data to create a Chat_sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat_sessions we want to update
     *   }
     * })
     */
    upsert<T extends chat_sessionsUpsertArgs>(args: SelectSubset<T, chat_sessionsUpsertArgs<ExtArgs>>): Prisma__chat_sessionsClient<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chat_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_sessionsCountArgs} args - Arguments to filter Chat_sessions to count.
     * @example
     * // Count the number of Chat_sessions
     * const count = await prisma.chat_sessions.count({
     *   where: {
     *     // ... the filter for the Chat_sessions we want to count
     *   }
     * })
    **/
    count<T extends chat_sessionsCountArgs>(
      args?: Subset<T, chat_sessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Chat_sessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Chat_sessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Chat_sessionsAggregateArgs>(args: Subset<T, Chat_sessionsAggregateArgs>): Prisma.PrismaPromise<GetChat_sessionsAggregateType<T>>

    /**
     * Group by Chat_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chat_sessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends chat_sessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chat_sessionsGroupByArgs['orderBy'] }
        : { orderBy?: chat_sessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, chat_sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChat_sessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chat_sessions model
   */
  readonly fields: chat_sessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chat_sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chat_sessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat_history<T extends chat_sessions$chat_historyArgs<ExtArgs> = {}>(args?: Subset<T, chat_sessions$chat_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    classes<T extends classesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, classesDefaultArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    topics<T extends topicsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, topicsDefaultArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the chat_sessions model
   */
  interface chat_sessionsFieldRefs {
    readonly session_id: FieldRef<"chat_sessions", 'String'>
    readonly class_code: FieldRef<"chat_sessions", 'String'>
    readonly user_id: FieldRef<"chat_sessions", 'String'>
    readonly topic_id: FieldRef<"chat_sessions", 'String'>
    readonly started_at: FieldRef<"chat_sessions", 'DateTime'>
    readonly created_at: FieldRef<"chat_sessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chat_sessions findUnique
   */
  export type chat_sessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which chat_sessions to fetch.
     */
    where: chat_sessionsWhereUniqueInput
  }

  /**
   * chat_sessions findUniqueOrThrow
   */
  export type chat_sessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which chat_sessions to fetch.
     */
    where: chat_sessionsWhereUniqueInput
  }

  /**
   * chat_sessions findFirst
   */
  export type chat_sessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which chat_sessions to fetch.
     */
    where?: chat_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_sessions to fetch.
     */
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chat_sessions.
     */
    cursor?: chat_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chat_sessions.
     */
    distinct?: Chat_sessionsScalarFieldEnum | Chat_sessionsScalarFieldEnum[]
  }

  /**
   * chat_sessions findFirstOrThrow
   */
  export type chat_sessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which chat_sessions to fetch.
     */
    where?: chat_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_sessions to fetch.
     */
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chat_sessions.
     */
    cursor?: chat_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chat_sessions.
     */
    distinct?: Chat_sessionsScalarFieldEnum | Chat_sessionsScalarFieldEnum[]
  }

  /**
   * chat_sessions findMany
   */
  export type chat_sessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which chat_sessions to fetch.
     */
    where?: chat_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chat_sessions to fetch.
     */
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chat_sessions.
     */
    cursor?: chat_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chat_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chat_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chat_sessions.
     */
    distinct?: Chat_sessionsScalarFieldEnum | Chat_sessionsScalarFieldEnum[]
  }

  /**
   * chat_sessions create
   */
  export type chat_sessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a chat_sessions.
     */
    data: XOR<chat_sessionsCreateInput, chat_sessionsUncheckedCreateInput>
  }

  /**
   * chat_sessions createMany
   */
  export type chat_sessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chat_sessions.
     */
    data: chat_sessionsCreateManyInput | chat_sessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chat_sessions createManyAndReturn
   */
  export type chat_sessionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * The data used to create many chat_sessions.
     */
    data: chat_sessionsCreateManyInput | chat_sessionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * chat_sessions update
   */
  export type chat_sessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a chat_sessions.
     */
    data: XOR<chat_sessionsUpdateInput, chat_sessionsUncheckedUpdateInput>
    /**
     * Choose, which chat_sessions to update.
     */
    where: chat_sessionsWhereUniqueInput
  }

  /**
   * chat_sessions updateMany
   */
  export type chat_sessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chat_sessions.
     */
    data: XOR<chat_sessionsUpdateManyMutationInput, chat_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which chat_sessions to update
     */
    where?: chat_sessionsWhereInput
    /**
     * Limit how many chat_sessions to update.
     */
    limit?: number
  }

  /**
   * chat_sessions updateManyAndReturn
   */
  export type chat_sessionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * The data used to update chat_sessions.
     */
    data: XOR<chat_sessionsUpdateManyMutationInput, chat_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which chat_sessions to update
     */
    where?: chat_sessionsWhereInput
    /**
     * Limit how many chat_sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * chat_sessions upsert
   */
  export type chat_sessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the chat_sessions to update in case it exists.
     */
    where: chat_sessionsWhereUniqueInput
    /**
     * In case the chat_sessions found by the `where` argument doesn't exist, create a new chat_sessions with this data.
     */
    create: XOR<chat_sessionsCreateInput, chat_sessionsUncheckedCreateInput>
    /**
     * In case the chat_sessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chat_sessionsUpdateInput, chat_sessionsUncheckedUpdateInput>
  }

  /**
   * chat_sessions delete
   */
  export type chat_sessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    /**
     * Filter which chat_sessions to delete.
     */
    where: chat_sessionsWhereUniqueInput
  }

  /**
   * chat_sessions deleteMany
   */
  export type chat_sessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chat_sessions to delete
     */
    where?: chat_sessionsWhereInput
    /**
     * Limit how many chat_sessions to delete.
     */
    limit?: number
  }

  /**
   * chat_sessions.chat_history
   */
  export type chat_sessions$chat_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_history
     */
    select?: chat_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_history
     */
    omit?: chat_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_historyInclude<ExtArgs> | null
    where?: chat_historyWhereInput
    orderBy?: chat_historyOrderByWithRelationInput | chat_historyOrderByWithRelationInput[]
    cursor?: chat_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Chat_historyScalarFieldEnum | Chat_historyScalarFieldEnum[]
  }

  /**
   * chat_sessions without action
   */
  export type chat_sessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
  }


  /**
   * Model classes
   */

  export type AggregateClasses = {
    _count: ClassesCountAggregateOutputType | null
    _min: ClassesMinAggregateOutputType | null
    _max: ClassesMaxAggregateOutputType | null
  }

  export type ClassesMinAggregateOutputType = {
    class_code: string | null
    subject: string | null
    name: string | null
    created_at: Date | null
    user_id: string | null
    syllabus_url: string | null
  }

  export type ClassesMaxAggregateOutputType = {
    class_code: string | null
    subject: string | null
    name: string | null
    created_at: Date | null
    user_id: string | null
    syllabus_url: string | null
  }

  export type ClassesCountAggregateOutputType = {
    class_code: number
    subject: number
    name: number
    created_at: number
    user_id: number
    syllabus_url: number
    _all: number
  }


  export type ClassesMinAggregateInputType = {
    class_code?: true
    subject?: true
    name?: true
    created_at?: true
    user_id?: true
    syllabus_url?: true
  }

  export type ClassesMaxAggregateInputType = {
    class_code?: true
    subject?: true
    name?: true
    created_at?: true
    user_id?: true
    syllabus_url?: true
  }

  export type ClassesCountAggregateInputType = {
    class_code?: true
    subject?: true
    name?: true
    created_at?: true
    user_id?: true
    syllabus_url?: true
    _all?: true
  }

  export type ClassesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which classes to aggregate.
     */
    where?: classesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of classes to fetch.
     */
    orderBy?: classesOrderByWithRelationInput | classesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: classesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned classes
    **/
    _count?: true | ClassesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassesMaxAggregateInputType
  }

  export type GetClassesAggregateType<T extends ClassesAggregateArgs> = {
        [P in keyof T & keyof AggregateClasses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClasses[P]>
      : GetScalarType<T[P], AggregateClasses[P]>
  }




  export type classesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: classesWhereInput
    orderBy?: classesOrderByWithAggregationInput | classesOrderByWithAggregationInput[]
    by: ClassesScalarFieldEnum[] | ClassesScalarFieldEnum
    having?: classesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassesCountAggregateInputType | true
    _min?: ClassesMinAggregateInputType
    _max?: ClassesMaxAggregateInputType
  }

  export type ClassesGroupByOutputType = {
    class_code: string
    subject: string
    name: string
    created_at: Date | null
    user_id: string | null
    syllabus_url: string | null
    _count: ClassesCountAggregateOutputType | null
    _min: ClassesMinAggregateOutputType | null
    _max: ClassesMaxAggregateOutputType | null
  }

  type GetClassesGroupByPayload<T extends classesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassesGroupByOutputType[P]>
            : GetScalarType<T[P], ClassesGroupByOutputType[P]>
        }
      >
    >


  export type classesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_code?: boolean
    subject?: boolean
    name?: boolean
    created_at?: boolean
    user_id?: boolean
    syllabus_url?: boolean
    chat_sessions?: boolean | classes$chat_sessionsArgs<ExtArgs>
    daily_topic_metrics?: boolean | classes$daily_topic_metricsArgs<ExtArgs>
    topics?: boolean | classes$topicsArgs<ExtArgs>
    _count?: boolean | ClassesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classes"]>

  export type classesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_code?: boolean
    subject?: boolean
    name?: boolean
    created_at?: boolean
    user_id?: boolean
    syllabus_url?: boolean
  }, ExtArgs["result"]["classes"]>

  export type classesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_code?: boolean
    subject?: boolean
    name?: boolean
    created_at?: boolean
    user_id?: boolean
    syllabus_url?: boolean
  }, ExtArgs["result"]["classes"]>

  export type classesSelectScalar = {
    class_code?: boolean
    subject?: boolean
    name?: boolean
    created_at?: boolean
    user_id?: boolean
    syllabus_url?: boolean
  }

  export type classesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"class_code" | "subject" | "name" | "created_at" | "user_id" | "syllabus_url", ExtArgs["result"]["classes"]>
  export type classesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | classes$chat_sessionsArgs<ExtArgs>
    daily_topic_metrics?: boolean | classes$daily_topic_metricsArgs<ExtArgs>
    topics?: boolean | classes$topicsArgs<ExtArgs>
    _count?: boolean | ClassesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type classesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type classesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $classesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "classes"
    objects: {
      chat_sessions: Prisma.$chat_sessionsPayload<ExtArgs>[]
      daily_topic_metrics: Prisma.$daily_topic_metricsPayload<ExtArgs>[]
      topics: Prisma.$topicsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      class_code: string
      subject: string
      name: string
      created_at: Date | null
      user_id: string | null
      syllabus_url: string | null
    }, ExtArgs["result"]["classes"]>
    composites: {}
  }

  type classesGetPayload<S extends boolean | null | undefined | classesDefaultArgs> = $Result.GetResult<Prisma.$classesPayload, S>

  type classesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<classesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassesCountAggregateInputType | true
    }

  export interface classesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['classes'], meta: { name: 'classes' } }
    /**
     * Find zero or one Classes that matches the filter.
     * @param {classesFindUniqueArgs} args - Arguments to find a Classes
     * @example
     * // Get one Classes
     * const classes = await prisma.classes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends classesFindUniqueArgs>(args: SelectSubset<T, classesFindUniqueArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Classes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {classesFindUniqueOrThrowArgs} args - Arguments to find a Classes
     * @example
     * // Get one Classes
     * const classes = await prisma.classes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends classesFindUniqueOrThrowArgs>(args: SelectSubset<T, classesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {classesFindFirstArgs} args - Arguments to find a Classes
     * @example
     * // Get one Classes
     * const classes = await prisma.classes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends classesFindFirstArgs>(args?: SelectSubset<T, classesFindFirstArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Classes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {classesFindFirstOrThrowArgs} args - Arguments to find a Classes
     * @example
     * // Get one Classes
     * const classes = await prisma.classes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends classesFindFirstOrThrowArgs>(args?: SelectSubset<T, classesFindFirstOrThrowArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {classesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.classes.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.classes.findMany({ take: 10 })
     * 
     * // Only select the `class_code`
     * const classesWithClass_codeOnly = await prisma.classes.findMany({ select: { class_code: true } })
     * 
     */
    findMany<T extends classesFindManyArgs>(args?: SelectSubset<T, classesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Classes.
     * @param {classesCreateArgs} args - Arguments to create a Classes.
     * @example
     * // Create one Classes
     * const Classes = await prisma.classes.create({
     *   data: {
     *     // ... data to create a Classes
     *   }
     * })
     * 
     */
    create<T extends classesCreateArgs>(args: SelectSubset<T, classesCreateArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {classesCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const classes = await prisma.classes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends classesCreateManyArgs>(args?: SelectSubset<T, classesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {classesCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const classes = await prisma.classes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `class_code`
     * const classesWithClass_codeOnly = await prisma.classes.createManyAndReturn({
     *   select: { class_code: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends classesCreateManyAndReturnArgs>(args?: SelectSubset<T, classesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Classes.
     * @param {classesDeleteArgs} args - Arguments to delete one Classes.
     * @example
     * // Delete one Classes
     * const Classes = await prisma.classes.delete({
     *   where: {
     *     // ... filter to delete one Classes
     *   }
     * })
     * 
     */
    delete<T extends classesDeleteArgs>(args: SelectSubset<T, classesDeleteArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Classes.
     * @param {classesUpdateArgs} args - Arguments to update one Classes.
     * @example
     * // Update one Classes
     * const classes = await prisma.classes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends classesUpdateArgs>(args: SelectSubset<T, classesUpdateArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {classesDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.classes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends classesDeleteManyArgs>(args?: SelectSubset<T, classesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {classesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const classes = await prisma.classes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends classesUpdateManyArgs>(args: SelectSubset<T, classesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {classesUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const classes = await prisma.classes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classes and only return the `class_code`
     * const classesWithClass_codeOnly = await prisma.classes.updateManyAndReturn({
     *   select: { class_code: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends classesUpdateManyAndReturnArgs>(args: SelectSubset<T, classesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Classes.
     * @param {classesUpsertArgs} args - Arguments to update or create a Classes.
     * @example
     * // Update or create a Classes
     * const classes = await prisma.classes.upsert({
     *   create: {
     *     // ... data to create a Classes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classes we want to update
     *   }
     * })
     */
    upsert<T extends classesUpsertArgs>(args: SelectSubset<T, classesUpsertArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {classesCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.classes.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends classesCountArgs>(
      args?: Subset<T, classesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassesAggregateArgs>(args: Subset<T, ClassesAggregateArgs>): Prisma.PrismaPromise<GetClassesAggregateType<T>>

    /**
     * Group by Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {classesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends classesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: classesGroupByArgs['orderBy'] }
        : { orderBy?: classesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, classesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the classes model
   */
  readonly fields: classesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for classes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__classesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat_sessions<T extends classes$chat_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, classes$chat_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    daily_topic_metrics<T extends classes$daily_topic_metricsArgs<ExtArgs> = {}>(args?: Subset<T, classes$daily_topic_metricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    topics<T extends classes$topicsArgs<ExtArgs> = {}>(args?: Subset<T, classes$topicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the classes model
   */
  interface classesFieldRefs {
    readonly class_code: FieldRef<"classes", 'String'>
    readonly subject: FieldRef<"classes", 'String'>
    readonly name: FieldRef<"classes", 'String'>
    readonly created_at: FieldRef<"classes", 'DateTime'>
    readonly user_id: FieldRef<"classes", 'String'>
    readonly syllabus_url: FieldRef<"classes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * classes findUnique
   */
  export type classesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * Filter, which classes to fetch.
     */
    where: classesWhereUniqueInput
  }

  /**
   * classes findUniqueOrThrow
   */
  export type classesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * Filter, which classes to fetch.
     */
    where: classesWhereUniqueInput
  }

  /**
   * classes findFirst
   */
  export type classesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * Filter, which classes to fetch.
     */
    where?: classesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of classes to fetch.
     */
    orderBy?: classesOrderByWithRelationInput | classesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for classes.
     */
    cursor?: classesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of classes.
     */
    distinct?: ClassesScalarFieldEnum | ClassesScalarFieldEnum[]
  }

  /**
   * classes findFirstOrThrow
   */
  export type classesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * Filter, which classes to fetch.
     */
    where?: classesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of classes to fetch.
     */
    orderBy?: classesOrderByWithRelationInput | classesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for classes.
     */
    cursor?: classesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of classes.
     */
    distinct?: ClassesScalarFieldEnum | ClassesScalarFieldEnum[]
  }

  /**
   * classes findMany
   */
  export type classesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * Filter, which classes to fetch.
     */
    where?: classesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of classes to fetch.
     */
    orderBy?: classesOrderByWithRelationInput | classesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing classes.
     */
    cursor?: classesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of classes.
     */
    distinct?: ClassesScalarFieldEnum | ClassesScalarFieldEnum[]
  }

  /**
   * classes create
   */
  export type classesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * The data needed to create a classes.
     */
    data: XOR<classesCreateInput, classesUncheckedCreateInput>
  }

  /**
   * classes createMany
   */
  export type classesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many classes.
     */
    data: classesCreateManyInput | classesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * classes createManyAndReturn
   */
  export type classesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * The data used to create many classes.
     */
    data: classesCreateManyInput | classesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * classes update
   */
  export type classesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * The data needed to update a classes.
     */
    data: XOR<classesUpdateInput, classesUncheckedUpdateInput>
    /**
     * Choose, which classes to update.
     */
    where: classesWhereUniqueInput
  }

  /**
   * classes updateMany
   */
  export type classesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update classes.
     */
    data: XOR<classesUpdateManyMutationInput, classesUncheckedUpdateManyInput>
    /**
     * Filter which classes to update
     */
    where?: classesWhereInput
    /**
     * Limit how many classes to update.
     */
    limit?: number
  }

  /**
   * classes updateManyAndReturn
   */
  export type classesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * The data used to update classes.
     */
    data: XOR<classesUpdateManyMutationInput, classesUncheckedUpdateManyInput>
    /**
     * Filter which classes to update
     */
    where?: classesWhereInput
    /**
     * Limit how many classes to update.
     */
    limit?: number
  }

  /**
   * classes upsert
   */
  export type classesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * The filter to search for the classes to update in case it exists.
     */
    where: classesWhereUniqueInput
    /**
     * In case the classes found by the `where` argument doesn't exist, create a new classes with this data.
     */
    create: XOR<classesCreateInput, classesUncheckedCreateInput>
    /**
     * In case the classes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<classesUpdateInput, classesUncheckedUpdateInput>
  }

  /**
   * classes delete
   */
  export type classesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
    /**
     * Filter which classes to delete.
     */
    where: classesWhereUniqueInput
  }

  /**
   * classes deleteMany
   */
  export type classesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which classes to delete
     */
    where?: classesWhereInput
    /**
     * Limit how many classes to delete.
     */
    limit?: number
  }

  /**
   * classes.chat_sessions
   */
  export type classes$chat_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    where?: chat_sessionsWhereInput
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    cursor?: chat_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Chat_sessionsScalarFieldEnum | Chat_sessionsScalarFieldEnum[]
  }

  /**
   * classes.daily_topic_metrics
   */
  export type classes$daily_topic_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    where?: daily_topic_metricsWhereInput
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    cursor?: daily_topic_metricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Daily_topic_metricsScalarFieldEnum | Daily_topic_metricsScalarFieldEnum[]
  }

  /**
   * classes.topics
   */
  export type classes$topicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    where?: topicsWhereInput
    orderBy?: topicsOrderByWithRelationInput | topicsOrderByWithRelationInput[]
    cursor?: topicsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }

  /**
   * classes without action
   */
  export type classesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the classes
     */
    select?: classesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the classes
     */
    omit?: classesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: classesInclude<ExtArgs> | null
  }


  /**
   * Model daily_topic_metrics
   */

  export type AggregateDaily_topic_metrics = {
    _count: Daily_topic_metricsCountAggregateOutputType | null
    _avg: Daily_topic_metricsAvgAggregateOutputType | null
    _sum: Daily_topic_metricsSumAggregateOutputType | null
    _min: Daily_topic_metricsMinAggregateOutputType | null
    _max: Daily_topic_metricsMaxAggregateOutputType | null
  }

  export type Daily_topic_metricsAvgAggregateOutputType = {
    avg_score: Decimal | null
  }

  export type Daily_topic_metricsSumAggregateOutputType = {
    avg_score: Decimal | null
  }

  export type Daily_topic_metricsMinAggregateOutputType = {
    user_id: string | null
    class_code: string | null
    topic_id: string | null
    metric_date: Date | null
    avg_score: Decimal | null
  }

  export type Daily_topic_metricsMaxAggregateOutputType = {
    user_id: string | null
    class_code: string | null
    topic_id: string | null
    metric_date: Date | null
    avg_score: Decimal | null
  }

  export type Daily_topic_metricsCountAggregateOutputType = {
    user_id: number
    class_code: number
    topic_id: number
    metric_date: number
    avg_score: number
    _all: number
  }


  export type Daily_topic_metricsAvgAggregateInputType = {
    avg_score?: true
  }

  export type Daily_topic_metricsSumAggregateInputType = {
    avg_score?: true
  }

  export type Daily_topic_metricsMinAggregateInputType = {
    user_id?: true
    class_code?: true
    topic_id?: true
    metric_date?: true
    avg_score?: true
  }

  export type Daily_topic_metricsMaxAggregateInputType = {
    user_id?: true
    class_code?: true
    topic_id?: true
    metric_date?: true
    avg_score?: true
  }

  export type Daily_topic_metricsCountAggregateInputType = {
    user_id?: true
    class_code?: true
    topic_id?: true
    metric_date?: true
    avg_score?: true
    _all?: true
  }

  export type Daily_topic_metricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which daily_topic_metrics to aggregate.
     */
    where?: daily_topic_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_topic_metrics to fetch.
     */
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: daily_topic_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_topic_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_topic_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned daily_topic_metrics
    **/
    _count?: true | Daily_topic_metricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Daily_topic_metricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Daily_topic_metricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Daily_topic_metricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Daily_topic_metricsMaxAggregateInputType
  }

  export type GetDaily_topic_metricsAggregateType<T extends Daily_topic_metricsAggregateArgs> = {
        [P in keyof T & keyof AggregateDaily_topic_metrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDaily_topic_metrics[P]>
      : GetScalarType<T[P], AggregateDaily_topic_metrics[P]>
  }




  export type daily_topic_metricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: daily_topic_metricsWhereInput
    orderBy?: daily_topic_metricsOrderByWithAggregationInput | daily_topic_metricsOrderByWithAggregationInput[]
    by: Daily_topic_metricsScalarFieldEnum[] | Daily_topic_metricsScalarFieldEnum
    having?: daily_topic_metricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Daily_topic_metricsCountAggregateInputType | true
    _avg?: Daily_topic_metricsAvgAggregateInputType
    _sum?: Daily_topic_metricsSumAggregateInputType
    _min?: Daily_topic_metricsMinAggregateInputType
    _max?: Daily_topic_metricsMaxAggregateInputType
  }

  export type Daily_topic_metricsGroupByOutputType = {
    user_id: string
    class_code: string
    topic_id: string
    metric_date: Date
    avg_score: Decimal | null
    _count: Daily_topic_metricsCountAggregateOutputType | null
    _avg: Daily_topic_metricsAvgAggregateOutputType | null
    _sum: Daily_topic_metricsSumAggregateOutputType | null
    _min: Daily_topic_metricsMinAggregateOutputType | null
    _max: Daily_topic_metricsMaxAggregateOutputType | null
  }

  type GetDaily_topic_metricsGroupByPayload<T extends daily_topic_metricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Daily_topic_metricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Daily_topic_metricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Daily_topic_metricsGroupByOutputType[P]>
            : GetScalarType<T[P], Daily_topic_metricsGroupByOutputType[P]>
        }
      >
    >


  export type daily_topic_metricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    class_code?: boolean
    topic_id?: boolean
    metric_date?: boolean
    avg_score?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["daily_topic_metrics"]>

  export type daily_topic_metricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    class_code?: boolean
    topic_id?: boolean
    metric_date?: boolean
    avg_score?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["daily_topic_metrics"]>

  export type daily_topic_metricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    class_code?: boolean
    topic_id?: boolean
    metric_date?: boolean
    avg_score?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["daily_topic_metrics"]>

  export type daily_topic_metricsSelectScalar = {
    user_id?: boolean
    class_code?: boolean
    topic_id?: boolean
    metric_date?: boolean
    avg_score?: boolean
  }

  export type daily_topic_metricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "class_code" | "topic_id" | "metric_date" | "avg_score", ExtArgs["result"]["daily_topic_metrics"]>
  export type daily_topic_metricsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type daily_topic_metricsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type daily_topic_metricsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
    topics?: boolean | topicsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $daily_topic_metricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "daily_topic_metrics"
    objects: {
      classes: Prisma.$classesPayload<ExtArgs>
      topics: Prisma.$topicsPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      class_code: string
      topic_id: string
      metric_date: Date
      avg_score: Prisma.Decimal | null
    }, ExtArgs["result"]["daily_topic_metrics"]>
    composites: {}
  }

  type daily_topic_metricsGetPayload<S extends boolean | null | undefined | daily_topic_metricsDefaultArgs> = $Result.GetResult<Prisma.$daily_topic_metricsPayload, S>

  type daily_topic_metricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<daily_topic_metricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Daily_topic_metricsCountAggregateInputType | true
    }

  export interface daily_topic_metricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['daily_topic_metrics'], meta: { name: 'daily_topic_metrics' } }
    /**
     * Find zero or one Daily_topic_metrics that matches the filter.
     * @param {daily_topic_metricsFindUniqueArgs} args - Arguments to find a Daily_topic_metrics
     * @example
     * // Get one Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends daily_topic_metricsFindUniqueArgs>(args: SelectSubset<T, daily_topic_metricsFindUniqueArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Daily_topic_metrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {daily_topic_metricsFindUniqueOrThrowArgs} args - Arguments to find a Daily_topic_metrics
     * @example
     * // Get one Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends daily_topic_metricsFindUniqueOrThrowArgs>(args: SelectSubset<T, daily_topic_metricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Daily_topic_metrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_topic_metricsFindFirstArgs} args - Arguments to find a Daily_topic_metrics
     * @example
     * // Get one Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends daily_topic_metricsFindFirstArgs>(args?: SelectSubset<T, daily_topic_metricsFindFirstArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Daily_topic_metrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_topic_metricsFindFirstOrThrowArgs} args - Arguments to find a Daily_topic_metrics
     * @example
     * // Get one Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends daily_topic_metricsFindFirstOrThrowArgs>(args?: SelectSubset<T, daily_topic_metricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Daily_topic_metrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_topic_metricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.findMany()
     * 
     * // Get first 10 Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const daily_topic_metricsWithUser_idOnly = await prisma.daily_topic_metrics.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends daily_topic_metricsFindManyArgs>(args?: SelectSubset<T, daily_topic_metricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Daily_topic_metrics.
     * @param {daily_topic_metricsCreateArgs} args - Arguments to create a Daily_topic_metrics.
     * @example
     * // Create one Daily_topic_metrics
     * const Daily_topic_metrics = await prisma.daily_topic_metrics.create({
     *   data: {
     *     // ... data to create a Daily_topic_metrics
     *   }
     * })
     * 
     */
    create<T extends daily_topic_metricsCreateArgs>(args: SelectSubset<T, daily_topic_metricsCreateArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Daily_topic_metrics.
     * @param {daily_topic_metricsCreateManyArgs} args - Arguments to create many Daily_topic_metrics.
     * @example
     * // Create many Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends daily_topic_metricsCreateManyArgs>(args?: SelectSubset<T, daily_topic_metricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Daily_topic_metrics and returns the data saved in the database.
     * @param {daily_topic_metricsCreateManyAndReturnArgs} args - Arguments to create many Daily_topic_metrics.
     * @example
     * // Create many Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Daily_topic_metrics and only return the `user_id`
     * const daily_topic_metricsWithUser_idOnly = await prisma.daily_topic_metrics.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends daily_topic_metricsCreateManyAndReturnArgs>(args?: SelectSubset<T, daily_topic_metricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Daily_topic_metrics.
     * @param {daily_topic_metricsDeleteArgs} args - Arguments to delete one Daily_topic_metrics.
     * @example
     * // Delete one Daily_topic_metrics
     * const Daily_topic_metrics = await prisma.daily_topic_metrics.delete({
     *   where: {
     *     // ... filter to delete one Daily_topic_metrics
     *   }
     * })
     * 
     */
    delete<T extends daily_topic_metricsDeleteArgs>(args: SelectSubset<T, daily_topic_metricsDeleteArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Daily_topic_metrics.
     * @param {daily_topic_metricsUpdateArgs} args - Arguments to update one Daily_topic_metrics.
     * @example
     * // Update one Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends daily_topic_metricsUpdateArgs>(args: SelectSubset<T, daily_topic_metricsUpdateArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Daily_topic_metrics.
     * @param {daily_topic_metricsDeleteManyArgs} args - Arguments to filter Daily_topic_metrics to delete.
     * @example
     * // Delete a few Daily_topic_metrics
     * const { count } = await prisma.daily_topic_metrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends daily_topic_metricsDeleteManyArgs>(args?: SelectSubset<T, daily_topic_metricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Daily_topic_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_topic_metricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends daily_topic_metricsUpdateManyArgs>(args: SelectSubset<T, daily_topic_metricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Daily_topic_metrics and returns the data updated in the database.
     * @param {daily_topic_metricsUpdateManyAndReturnArgs} args - Arguments to update many Daily_topic_metrics.
     * @example
     * // Update many Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Daily_topic_metrics and only return the `user_id`
     * const daily_topic_metricsWithUser_idOnly = await prisma.daily_topic_metrics.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends daily_topic_metricsUpdateManyAndReturnArgs>(args: SelectSubset<T, daily_topic_metricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Daily_topic_metrics.
     * @param {daily_topic_metricsUpsertArgs} args - Arguments to update or create a Daily_topic_metrics.
     * @example
     * // Update or create a Daily_topic_metrics
     * const daily_topic_metrics = await prisma.daily_topic_metrics.upsert({
     *   create: {
     *     // ... data to create a Daily_topic_metrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Daily_topic_metrics we want to update
     *   }
     * })
     */
    upsert<T extends daily_topic_metricsUpsertArgs>(args: SelectSubset<T, daily_topic_metricsUpsertArgs<ExtArgs>>): Prisma__daily_topic_metricsClient<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Daily_topic_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_topic_metricsCountArgs} args - Arguments to filter Daily_topic_metrics to count.
     * @example
     * // Count the number of Daily_topic_metrics
     * const count = await prisma.daily_topic_metrics.count({
     *   where: {
     *     // ... the filter for the Daily_topic_metrics we want to count
     *   }
     * })
    **/
    count<T extends daily_topic_metricsCountArgs>(
      args?: Subset<T, daily_topic_metricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Daily_topic_metricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Daily_topic_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Daily_topic_metricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Daily_topic_metricsAggregateArgs>(args: Subset<T, Daily_topic_metricsAggregateArgs>): Prisma.PrismaPromise<GetDaily_topic_metricsAggregateType<T>>

    /**
     * Group by Daily_topic_metrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {daily_topic_metricsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends daily_topic_metricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: daily_topic_metricsGroupByArgs['orderBy'] }
        : { orderBy?: daily_topic_metricsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, daily_topic_metricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDaily_topic_metricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the daily_topic_metrics model
   */
  readonly fields: daily_topic_metricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for daily_topic_metrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__daily_topic_metricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classes<T extends classesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, classesDefaultArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    topics<T extends topicsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, topicsDefaultArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the daily_topic_metrics model
   */
  interface daily_topic_metricsFieldRefs {
    readonly user_id: FieldRef<"daily_topic_metrics", 'String'>
    readonly class_code: FieldRef<"daily_topic_metrics", 'String'>
    readonly topic_id: FieldRef<"daily_topic_metrics", 'String'>
    readonly metric_date: FieldRef<"daily_topic_metrics", 'DateTime'>
    readonly avg_score: FieldRef<"daily_topic_metrics", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * daily_topic_metrics findUnique
   */
  export type daily_topic_metricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * Filter, which daily_topic_metrics to fetch.
     */
    where: daily_topic_metricsWhereUniqueInput
  }

  /**
   * daily_topic_metrics findUniqueOrThrow
   */
  export type daily_topic_metricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * Filter, which daily_topic_metrics to fetch.
     */
    where: daily_topic_metricsWhereUniqueInput
  }

  /**
   * daily_topic_metrics findFirst
   */
  export type daily_topic_metricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * Filter, which daily_topic_metrics to fetch.
     */
    where?: daily_topic_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_topic_metrics to fetch.
     */
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for daily_topic_metrics.
     */
    cursor?: daily_topic_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_topic_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_topic_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of daily_topic_metrics.
     */
    distinct?: Daily_topic_metricsScalarFieldEnum | Daily_topic_metricsScalarFieldEnum[]
  }

  /**
   * daily_topic_metrics findFirstOrThrow
   */
  export type daily_topic_metricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * Filter, which daily_topic_metrics to fetch.
     */
    where?: daily_topic_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_topic_metrics to fetch.
     */
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for daily_topic_metrics.
     */
    cursor?: daily_topic_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_topic_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_topic_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of daily_topic_metrics.
     */
    distinct?: Daily_topic_metricsScalarFieldEnum | Daily_topic_metricsScalarFieldEnum[]
  }

  /**
   * daily_topic_metrics findMany
   */
  export type daily_topic_metricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * Filter, which daily_topic_metrics to fetch.
     */
    where?: daily_topic_metricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of daily_topic_metrics to fetch.
     */
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing daily_topic_metrics.
     */
    cursor?: daily_topic_metricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` daily_topic_metrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` daily_topic_metrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of daily_topic_metrics.
     */
    distinct?: Daily_topic_metricsScalarFieldEnum | Daily_topic_metricsScalarFieldEnum[]
  }

  /**
   * daily_topic_metrics create
   */
  export type daily_topic_metricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * The data needed to create a daily_topic_metrics.
     */
    data: XOR<daily_topic_metricsCreateInput, daily_topic_metricsUncheckedCreateInput>
  }

  /**
   * daily_topic_metrics createMany
   */
  export type daily_topic_metricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many daily_topic_metrics.
     */
    data: daily_topic_metricsCreateManyInput | daily_topic_metricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * daily_topic_metrics createManyAndReturn
   */
  export type daily_topic_metricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * The data used to create many daily_topic_metrics.
     */
    data: daily_topic_metricsCreateManyInput | daily_topic_metricsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * daily_topic_metrics update
   */
  export type daily_topic_metricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * The data needed to update a daily_topic_metrics.
     */
    data: XOR<daily_topic_metricsUpdateInput, daily_topic_metricsUncheckedUpdateInput>
    /**
     * Choose, which daily_topic_metrics to update.
     */
    where: daily_topic_metricsWhereUniqueInput
  }

  /**
   * daily_topic_metrics updateMany
   */
  export type daily_topic_metricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update daily_topic_metrics.
     */
    data: XOR<daily_topic_metricsUpdateManyMutationInput, daily_topic_metricsUncheckedUpdateManyInput>
    /**
     * Filter which daily_topic_metrics to update
     */
    where?: daily_topic_metricsWhereInput
    /**
     * Limit how many daily_topic_metrics to update.
     */
    limit?: number
  }

  /**
   * daily_topic_metrics updateManyAndReturn
   */
  export type daily_topic_metricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * The data used to update daily_topic_metrics.
     */
    data: XOR<daily_topic_metricsUpdateManyMutationInput, daily_topic_metricsUncheckedUpdateManyInput>
    /**
     * Filter which daily_topic_metrics to update
     */
    where?: daily_topic_metricsWhereInput
    /**
     * Limit how many daily_topic_metrics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * daily_topic_metrics upsert
   */
  export type daily_topic_metricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * The filter to search for the daily_topic_metrics to update in case it exists.
     */
    where: daily_topic_metricsWhereUniqueInput
    /**
     * In case the daily_topic_metrics found by the `where` argument doesn't exist, create a new daily_topic_metrics with this data.
     */
    create: XOR<daily_topic_metricsCreateInput, daily_topic_metricsUncheckedCreateInput>
    /**
     * In case the daily_topic_metrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<daily_topic_metricsUpdateInput, daily_topic_metricsUncheckedUpdateInput>
  }

  /**
   * daily_topic_metrics delete
   */
  export type daily_topic_metricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    /**
     * Filter which daily_topic_metrics to delete.
     */
    where: daily_topic_metricsWhereUniqueInput
  }

  /**
   * daily_topic_metrics deleteMany
   */
  export type daily_topic_metricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which daily_topic_metrics to delete
     */
    where?: daily_topic_metricsWhereInput
    /**
     * Limit how many daily_topic_metrics to delete.
     */
    limit?: number
  }

  /**
   * daily_topic_metrics without action
   */
  export type daily_topic_metricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
  }


  /**
   * Model friend_requests
   */

  export type AggregateFriend_requests = {
    _count: Friend_requestsCountAggregateOutputType | null
    _min: Friend_requestsMinAggregateOutputType | null
    _max: Friend_requestsMaxAggregateOutputType | null
  }

  export type Friend_requestsMinAggregateOutputType = {
    id: string | null
    sender_id: string | null
    receiver_id: string | null
    status: string | null
    created_at: Date | null
    responded_at: Date | null
  }

  export type Friend_requestsMaxAggregateOutputType = {
    id: string | null
    sender_id: string | null
    receiver_id: string | null
    status: string | null
    created_at: Date | null
    responded_at: Date | null
  }

  export type Friend_requestsCountAggregateOutputType = {
    id: number
    sender_id: number
    receiver_id: number
    status: number
    created_at: number
    responded_at: number
    _all: number
  }


  export type Friend_requestsMinAggregateInputType = {
    id?: true
    sender_id?: true
    receiver_id?: true
    status?: true
    created_at?: true
    responded_at?: true
  }

  export type Friend_requestsMaxAggregateInputType = {
    id?: true
    sender_id?: true
    receiver_id?: true
    status?: true
    created_at?: true
    responded_at?: true
  }

  export type Friend_requestsCountAggregateInputType = {
    id?: true
    sender_id?: true
    receiver_id?: true
    status?: true
    created_at?: true
    responded_at?: true
    _all?: true
  }

  export type Friend_requestsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which friend_requests to aggregate.
     */
    where?: friend_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friend_requests to fetch.
     */
    orderBy?: friend_requestsOrderByWithRelationInput | friend_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: friend_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friend_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friend_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned friend_requests
    **/
    _count?: true | Friend_requestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Friend_requestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Friend_requestsMaxAggregateInputType
  }

  export type GetFriend_requestsAggregateType<T extends Friend_requestsAggregateArgs> = {
        [P in keyof T & keyof AggregateFriend_requests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriend_requests[P]>
      : GetScalarType<T[P], AggregateFriend_requests[P]>
  }




  export type friend_requestsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: friend_requestsWhereInput
    orderBy?: friend_requestsOrderByWithAggregationInput | friend_requestsOrderByWithAggregationInput[]
    by: Friend_requestsScalarFieldEnum[] | Friend_requestsScalarFieldEnum
    having?: friend_requestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Friend_requestsCountAggregateInputType | true
    _min?: Friend_requestsMinAggregateInputType
    _max?: Friend_requestsMaxAggregateInputType
  }

  export type Friend_requestsGroupByOutputType = {
    id: string
    sender_id: string
    receiver_id: string
    status: string
    created_at: Date | null
    responded_at: Date | null
    _count: Friend_requestsCountAggregateOutputType | null
    _min: Friend_requestsMinAggregateOutputType | null
    _max: Friend_requestsMaxAggregateOutputType | null
  }

  type GetFriend_requestsGroupByPayload<T extends friend_requestsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Friend_requestsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Friend_requestsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Friend_requestsGroupByOutputType[P]>
            : GetScalarType<T[P], Friend_requestsGroupByOutputType[P]>
        }
      >
    >


  export type friend_requestsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    status?: boolean
    created_at?: boolean
    responded_at?: boolean
    users_friend_requests_receiver_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friend_requests_sender_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend_requests"]>

  export type friend_requestsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    status?: boolean
    created_at?: boolean
    responded_at?: boolean
    users_friend_requests_receiver_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friend_requests_sender_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend_requests"]>

  export type friend_requestsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    status?: boolean
    created_at?: boolean
    responded_at?: boolean
    users_friend_requests_receiver_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friend_requests_sender_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend_requests"]>

  export type friend_requestsSelectScalar = {
    id?: boolean
    sender_id?: boolean
    receiver_id?: boolean
    status?: boolean
    created_at?: boolean
    responded_at?: boolean
  }

  export type friend_requestsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sender_id" | "receiver_id" | "status" | "created_at" | "responded_at", ExtArgs["result"]["friend_requests"]>
  export type friend_requestsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_friend_requests_receiver_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friend_requests_sender_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type friend_requestsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_friend_requests_receiver_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friend_requests_sender_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type friend_requestsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_friend_requests_receiver_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friend_requests_sender_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $friend_requestsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "friend_requests"
    objects: {
      users_friend_requests_receiver_idTousers: Prisma.$UserPayload<ExtArgs>
      users_friend_requests_sender_idTousers: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sender_id: string
      receiver_id: string
      status: string
      created_at: Date | null
      responded_at: Date | null
    }, ExtArgs["result"]["friend_requests"]>
    composites: {}
  }

  type friend_requestsGetPayload<S extends boolean | null | undefined | friend_requestsDefaultArgs> = $Result.GetResult<Prisma.$friend_requestsPayload, S>

  type friend_requestsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<friend_requestsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Friend_requestsCountAggregateInputType | true
    }

  export interface friend_requestsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['friend_requests'], meta: { name: 'friend_requests' } }
    /**
     * Find zero or one Friend_requests that matches the filter.
     * @param {friend_requestsFindUniqueArgs} args - Arguments to find a Friend_requests
     * @example
     * // Get one Friend_requests
     * const friend_requests = await prisma.friend_requests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends friend_requestsFindUniqueArgs>(args: SelectSubset<T, friend_requestsFindUniqueArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friend_requests that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {friend_requestsFindUniqueOrThrowArgs} args - Arguments to find a Friend_requests
     * @example
     * // Get one Friend_requests
     * const friend_requests = await prisma.friend_requests.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends friend_requestsFindUniqueOrThrowArgs>(args: SelectSubset<T, friend_requestsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friend_requestsFindFirstArgs} args - Arguments to find a Friend_requests
     * @example
     * // Get one Friend_requests
     * const friend_requests = await prisma.friend_requests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends friend_requestsFindFirstArgs>(args?: SelectSubset<T, friend_requestsFindFirstArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend_requests that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friend_requestsFindFirstOrThrowArgs} args - Arguments to find a Friend_requests
     * @example
     * // Get one Friend_requests
     * const friend_requests = await prisma.friend_requests.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends friend_requestsFindFirstOrThrowArgs>(args?: SelectSubset<T, friend_requestsFindFirstOrThrowArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friend_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friend_requestsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friend_requests
     * const friend_requests = await prisma.friend_requests.findMany()
     * 
     * // Get first 10 Friend_requests
     * const friend_requests = await prisma.friend_requests.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friend_requestsWithIdOnly = await prisma.friend_requests.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends friend_requestsFindManyArgs>(args?: SelectSubset<T, friend_requestsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friend_requests.
     * @param {friend_requestsCreateArgs} args - Arguments to create a Friend_requests.
     * @example
     * // Create one Friend_requests
     * const Friend_requests = await prisma.friend_requests.create({
     *   data: {
     *     // ... data to create a Friend_requests
     *   }
     * })
     * 
     */
    create<T extends friend_requestsCreateArgs>(args: SelectSubset<T, friend_requestsCreateArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friend_requests.
     * @param {friend_requestsCreateManyArgs} args - Arguments to create many Friend_requests.
     * @example
     * // Create many Friend_requests
     * const friend_requests = await prisma.friend_requests.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends friend_requestsCreateManyArgs>(args?: SelectSubset<T, friend_requestsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friend_requests and returns the data saved in the database.
     * @param {friend_requestsCreateManyAndReturnArgs} args - Arguments to create many Friend_requests.
     * @example
     * // Create many Friend_requests
     * const friend_requests = await prisma.friend_requests.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friend_requests and only return the `id`
     * const friend_requestsWithIdOnly = await prisma.friend_requests.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends friend_requestsCreateManyAndReturnArgs>(args?: SelectSubset<T, friend_requestsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Friend_requests.
     * @param {friend_requestsDeleteArgs} args - Arguments to delete one Friend_requests.
     * @example
     * // Delete one Friend_requests
     * const Friend_requests = await prisma.friend_requests.delete({
     *   where: {
     *     // ... filter to delete one Friend_requests
     *   }
     * })
     * 
     */
    delete<T extends friend_requestsDeleteArgs>(args: SelectSubset<T, friend_requestsDeleteArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friend_requests.
     * @param {friend_requestsUpdateArgs} args - Arguments to update one Friend_requests.
     * @example
     * // Update one Friend_requests
     * const friend_requests = await prisma.friend_requests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends friend_requestsUpdateArgs>(args: SelectSubset<T, friend_requestsUpdateArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friend_requests.
     * @param {friend_requestsDeleteManyArgs} args - Arguments to filter Friend_requests to delete.
     * @example
     * // Delete a few Friend_requests
     * const { count } = await prisma.friend_requests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends friend_requestsDeleteManyArgs>(args?: SelectSubset<T, friend_requestsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friend_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friend_requestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friend_requests
     * const friend_requests = await prisma.friend_requests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends friend_requestsUpdateManyArgs>(args: SelectSubset<T, friend_requestsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friend_requests and returns the data updated in the database.
     * @param {friend_requestsUpdateManyAndReturnArgs} args - Arguments to update many Friend_requests.
     * @example
     * // Update many Friend_requests
     * const friend_requests = await prisma.friend_requests.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friend_requests and only return the `id`
     * const friend_requestsWithIdOnly = await prisma.friend_requests.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends friend_requestsUpdateManyAndReturnArgs>(args: SelectSubset<T, friend_requestsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Friend_requests.
     * @param {friend_requestsUpsertArgs} args - Arguments to update or create a Friend_requests.
     * @example
     * // Update or create a Friend_requests
     * const friend_requests = await prisma.friend_requests.upsert({
     *   create: {
     *     // ... data to create a Friend_requests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friend_requests we want to update
     *   }
     * })
     */
    upsert<T extends friend_requestsUpsertArgs>(args: SelectSubset<T, friend_requestsUpsertArgs<ExtArgs>>): Prisma__friend_requestsClient<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friend_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friend_requestsCountArgs} args - Arguments to filter Friend_requests to count.
     * @example
     * // Count the number of Friend_requests
     * const count = await prisma.friend_requests.count({
     *   where: {
     *     // ... the filter for the Friend_requests we want to count
     *   }
     * })
    **/
    count<T extends friend_requestsCountArgs>(
      args?: Subset<T, friend_requestsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Friend_requestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friend_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Friend_requestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Friend_requestsAggregateArgs>(args: Subset<T, Friend_requestsAggregateArgs>): Prisma.PrismaPromise<GetFriend_requestsAggregateType<T>>

    /**
     * Group by Friend_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friend_requestsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends friend_requestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: friend_requestsGroupByArgs['orderBy'] }
        : { orderBy?: friend_requestsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, friend_requestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriend_requestsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the friend_requests model
   */
  readonly fields: friend_requestsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for friend_requests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__friend_requestsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_friend_requests_receiver_idTousers<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_friend_requests_sender_idTousers<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the friend_requests model
   */
  interface friend_requestsFieldRefs {
    readonly id: FieldRef<"friend_requests", 'String'>
    readonly sender_id: FieldRef<"friend_requests", 'String'>
    readonly receiver_id: FieldRef<"friend_requests", 'String'>
    readonly status: FieldRef<"friend_requests", 'String'>
    readonly created_at: FieldRef<"friend_requests", 'DateTime'>
    readonly responded_at: FieldRef<"friend_requests", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * friend_requests findUnique
   */
  export type friend_requestsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * Filter, which friend_requests to fetch.
     */
    where: friend_requestsWhereUniqueInput
  }

  /**
   * friend_requests findUniqueOrThrow
   */
  export type friend_requestsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * Filter, which friend_requests to fetch.
     */
    where: friend_requestsWhereUniqueInput
  }

  /**
   * friend_requests findFirst
   */
  export type friend_requestsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * Filter, which friend_requests to fetch.
     */
    where?: friend_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friend_requests to fetch.
     */
    orderBy?: friend_requestsOrderByWithRelationInput | friend_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for friend_requests.
     */
    cursor?: friend_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friend_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friend_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of friend_requests.
     */
    distinct?: Friend_requestsScalarFieldEnum | Friend_requestsScalarFieldEnum[]
  }

  /**
   * friend_requests findFirstOrThrow
   */
  export type friend_requestsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * Filter, which friend_requests to fetch.
     */
    where?: friend_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friend_requests to fetch.
     */
    orderBy?: friend_requestsOrderByWithRelationInput | friend_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for friend_requests.
     */
    cursor?: friend_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friend_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friend_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of friend_requests.
     */
    distinct?: Friend_requestsScalarFieldEnum | Friend_requestsScalarFieldEnum[]
  }

  /**
   * friend_requests findMany
   */
  export type friend_requestsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * Filter, which friend_requests to fetch.
     */
    where?: friend_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friend_requests to fetch.
     */
    orderBy?: friend_requestsOrderByWithRelationInput | friend_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing friend_requests.
     */
    cursor?: friend_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friend_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friend_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of friend_requests.
     */
    distinct?: Friend_requestsScalarFieldEnum | Friend_requestsScalarFieldEnum[]
  }

  /**
   * friend_requests create
   */
  export type friend_requestsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * The data needed to create a friend_requests.
     */
    data: XOR<friend_requestsCreateInput, friend_requestsUncheckedCreateInput>
  }

  /**
   * friend_requests createMany
   */
  export type friend_requestsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many friend_requests.
     */
    data: friend_requestsCreateManyInput | friend_requestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * friend_requests createManyAndReturn
   */
  export type friend_requestsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * The data used to create many friend_requests.
     */
    data: friend_requestsCreateManyInput | friend_requestsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * friend_requests update
   */
  export type friend_requestsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * The data needed to update a friend_requests.
     */
    data: XOR<friend_requestsUpdateInput, friend_requestsUncheckedUpdateInput>
    /**
     * Choose, which friend_requests to update.
     */
    where: friend_requestsWhereUniqueInput
  }

  /**
   * friend_requests updateMany
   */
  export type friend_requestsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update friend_requests.
     */
    data: XOR<friend_requestsUpdateManyMutationInput, friend_requestsUncheckedUpdateManyInput>
    /**
     * Filter which friend_requests to update
     */
    where?: friend_requestsWhereInput
    /**
     * Limit how many friend_requests to update.
     */
    limit?: number
  }

  /**
   * friend_requests updateManyAndReturn
   */
  export type friend_requestsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * The data used to update friend_requests.
     */
    data: XOR<friend_requestsUpdateManyMutationInput, friend_requestsUncheckedUpdateManyInput>
    /**
     * Filter which friend_requests to update
     */
    where?: friend_requestsWhereInput
    /**
     * Limit how many friend_requests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * friend_requests upsert
   */
  export type friend_requestsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * The filter to search for the friend_requests to update in case it exists.
     */
    where: friend_requestsWhereUniqueInput
    /**
     * In case the friend_requests found by the `where` argument doesn't exist, create a new friend_requests with this data.
     */
    create: XOR<friend_requestsCreateInput, friend_requestsUncheckedCreateInput>
    /**
     * In case the friend_requests was found with the provided `where` argument, update it with this data.
     */
    update: XOR<friend_requestsUpdateInput, friend_requestsUncheckedUpdateInput>
  }

  /**
   * friend_requests delete
   */
  export type friend_requestsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    /**
     * Filter which friend_requests to delete.
     */
    where: friend_requestsWhereUniqueInput
  }

  /**
   * friend_requests deleteMany
   */
  export type friend_requestsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which friend_requests to delete
     */
    where?: friend_requestsWhereInput
    /**
     * Limit how many friend_requests to delete.
     */
    limit?: number
  }

  /**
   * friend_requests without action
   */
  export type friend_requestsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
  }


  /**
   * Model friends
   */

  export type AggregateFriends = {
    _count: FriendsCountAggregateOutputType | null
    _avg: FriendsAvgAggregateOutputType | null
    _sum: FriendsSumAggregateOutputType | null
    _min: FriendsMinAggregateOutputType | null
    _max: FriendsMaxAggregateOutputType | null
  }

  export type FriendsAvgAggregateOutputType = {
    streak: number | null
    total_xp: number | null
  }

  export type FriendsSumAggregateOutputType = {
    streak: number | null
    total_xp: number | null
  }

  export type FriendsMinAggregateOutputType = {
    user_id: string | null
    friend_id: string | null
    created_at: Date | null
    streak: number | null
    total_xp: number | null
  }

  export type FriendsMaxAggregateOutputType = {
    user_id: string | null
    friend_id: string | null
    created_at: Date | null
    streak: number | null
    total_xp: number | null
  }

  export type FriendsCountAggregateOutputType = {
    user_id: number
    friend_id: number
    created_at: number
    streak: number
    total_xp: number
    _all: number
  }


  export type FriendsAvgAggregateInputType = {
    streak?: true
    total_xp?: true
  }

  export type FriendsSumAggregateInputType = {
    streak?: true
    total_xp?: true
  }

  export type FriendsMinAggregateInputType = {
    user_id?: true
    friend_id?: true
    created_at?: true
    streak?: true
    total_xp?: true
  }

  export type FriendsMaxAggregateInputType = {
    user_id?: true
    friend_id?: true
    created_at?: true
    streak?: true
    total_xp?: true
  }

  export type FriendsCountAggregateInputType = {
    user_id?: true
    friend_id?: true
    created_at?: true
    streak?: true
    total_xp?: true
    _all?: true
  }

  export type FriendsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which friends to aggregate.
     */
    where?: friendsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friends to fetch.
     */
    orderBy?: friendsOrderByWithRelationInput | friendsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: friendsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned friends
    **/
    _count?: true | FriendsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FriendsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FriendsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendsMaxAggregateInputType
  }

  export type GetFriendsAggregateType<T extends FriendsAggregateArgs> = {
        [P in keyof T & keyof AggregateFriends]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriends[P]>
      : GetScalarType<T[P], AggregateFriends[P]>
  }




  export type friendsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: friendsWhereInput
    orderBy?: friendsOrderByWithAggregationInput | friendsOrderByWithAggregationInput[]
    by: FriendsScalarFieldEnum[] | FriendsScalarFieldEnum
    having?: friendsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendsCountAggregateInputType | true
    _avg?: FriendsAvgAggregateInputType
    _sum?: FriendsSumAggregateInputType
    _min?: FriendsMinAggregateInputType
    _max?: FriendsMaxAggregateInputType
  }

  export type FriendsGroupByOutputType = {
    user_id: string
    friend_id: string
    created_at: Date | null
    streak: number | null
    total_xp: number | null
    _count: FriendsCountAggregateOutputType | null
    _avg: FriendsAvgAggregateOutputType | null
    _sum: FriendsSumAggregateOutputType | null
    _min: FriendsMinAggregateOutputType | null
    _max: FriendsMaxAggregateOutputType | null
  }

  type GetFriendsGroupByPayload<T extends friendsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendsGroupByOutputType[P]>
            : GetScalarType<T[P], FriendsGroupByOutputType[P]>
        }
      >
    >


  export type friendsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    friend_id?: boolean
    created_at?: boolean
    streak?: boolean
    total_xp?: boolean
    users_friends_friend_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friends_user_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friends"]>

  export type friendsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    friend_id?: boolean
    created_at?: boolean
    streak?: boolean
    total_xp?: boolean
    users_friends_friend_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friends_user_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friends"]>

  export type friendsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    friend_id?: boolean
    created_at?: boolean
    streak?: boolean
    total_xp?: boolean
    users_friends_friend_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friends_user_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friends"]>

  export type friendsSelectScalar = {
    user_id?: boolean
    friend_id?: boolean
    created_at?: boolean
    streak?: boolean
    total_xp?: boolean
  }

  export type friendsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "friend_id" | "created_at" | "streak" | "total_xp", ExtArgs["result"]["friends"]>
  export type friendsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_friends_friend_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friends_user_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type friendsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_friends_friend_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friends_user_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type friendsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_friends_friend_idTousers?: boolean | UserDefaultArgs<ExtArgs>
    users_friends_user_idTousers?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $friendsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "friends"
    objects: {
      users_friends_friend_idTousers: Prisma.$UserPayload<ExtArgs>
      users_friends_user_idTousers: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      friend_id: string
      created_at: Date | null
      streak: number | null
      total_xp: number | null
    }, ExtArgs["result"]["friends"]>
    composites: {}
  }

  type friendsGetPayload<S extends boolean | null | undefined | friendsDefaultArgs> = $Result.GetResult<Prisma.$friendsPayload, S>

  type friendsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<friendsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendsCountAggregateInputType | true
    }

  export interface friendsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['friends'], meta: { name: 'friends' } }
    /**
     * Find zero or one Friends that matches the filter.
     * @param {friendsFindUniqueArgs} args - Arguments to find a Friends
     * @example
     * // Get one Friends
     * const friends = await prisma.friends.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends friendsFindUniqueArgs>(args: SelectSubset<T, friendsFindUniqueArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friends that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {friendsFindUniqueOrThrowArgs} args - Arguments to find a Friends
     * @example
     * // Get one Friends
     * const friends = await prisma.friends.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends friendsFindUniqueOrThrowArgs>(args: SelectSubset<T, friendsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friendsFindFirstArgs} args - Arguments to find a Friends
     * @example
     * // Get one Friends
     * const friends = await prisma.friends.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends friendsFindFirstArgs>(args?: SelectSubset<T, friendsFindFirstArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friends that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friendsFindFirstOrThrowArgs} args - Arguments to find a Friends
     * @example
     * // Get one Friends
     * const friends = await prisma.friends.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends friendsFindFirstOrThrowArgs>(args?: SelectSubset<T, friendsFindFirstOrThrowArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friendsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friends
     * const friends = await prisma.friends.findMany()
     * 
     * // Get first 10 Friends
     * const friends = await prisma.friends.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const friendsWithUser_idOnly = await prisma.friends.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends friendsFindManyArgs>(args?: SelectSubset<T, friendsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friends.
     * @param {friendsCreateArgs} args - Arguments to create a Friends.
     * @example
     * // Create one Friends
     * const Friends = await prisma.friends.create({
     *   data: {
     *     // ... data to create a Friends
     *   }
     * })
     * 
     */
    create<T extends friendsCreateArgs>(args: SelectSubset<T, friendsCreateArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friends.
     * @param {friendsCreateManyArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friends = await prisma.friends.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends friendsCreateManyArgs>(args?: SelectSubset<T, friendsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friends and returns the data saved in the database.
     * @param {friendsCreateManyAndReturnArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friends = await prisma.friends.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friends and only return the `user_id`
     * const friendsWithUser_idOnly = await prisma.friends.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends friendsCreateManyAndReturnArgs>(args?: SelectSubset<T, friendsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Friends.
     * @param {friendsDeleteArgs} args - Arguments to delete one Friends.
     * @example
     * // Delete one Friends
     * const Friends = await prisma.friends.delete({
     *   where: {
     *     // ... filter to delete one Friends
     *   }
     * })
     * 
     */
    delete<T extends friendsDeleteArgs>(args: SelectSubset<T, friendsDeleteArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friends.
     * @param {friendsUpdateArgs} args - Arguments to update one Friends.
     * @example
     * // Update one Friends
     * const friends = await prisma.friends.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends friendsUpdateArgs>(args: SelectSubset<T, friendsUpdateArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friends.
     * @param {friendsDeleteManyArgs} args - Arguments to filter Friends to delete.
     * @example
     * // Delete a few Friends
     * const { count } = await prisma.friends.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends friendsDeleteManyArgs>(args?: SelectSubset<T, friendsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friendsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friends
     * const friends = await prisma.friends.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends friendsUpdateManyArgs>(args: SelectSubset<T, friendsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends and returns the data updated in the database.
     * @param {friendsUpdateManyAndReturnArgs} args - Arguments to update many Friends.
     * @example
     * // Update many Friends
     * const friends = await prisma.friends.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friends and only return the `user_id`
     * const friendsWithUser_idOnly = await prisma.friends.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends friendsUpdateManyAndReturnArgs>(args: SelectSubset<T, friendsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Friends.
     * @param {friendsUpsertArgs} args - Arguments to update or create a Friends.
     * @example
     * // Update or create a Friends
     * const friends = await prisma.friends.upsert({
     *   create: {
     *     // ... data to create a Friends
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friends we want to update
     *   }
     * })
     */
    upsert<T extends friendsUpsertArgs>(args: SelectSubset<T, friendsUpsertArgs<ExtArgs>>): Prisma__friendsClient<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friendsCountArgs} args - Arguments to filter Friends to count.
     * @example
     * // Count the number of Friends
     * const count = await prisma.friends.count({
     *   where: {
     *     // ... the filter for the Friends we want to count
     *   }
     * })
    **/
    count<T extends friendsCountArgs>(
      args?: Subset<T, friendsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendsAggregateArgs>(args: Subset<T, FriendsAggregateArgs>): Prisma.PrismaPromise<GetFriendsAggregateType<T>>

    /**
     * Group by Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {friendsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends friendsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: friendsGroupByArgs['orderBy'] }
        : { orderBy?: friendsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, friendsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the friends model
   */
  readonly fields: friendsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for friends.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__friendsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_friends_friend_idTousers<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_friends_user_idTousers<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the friends model
   */
  interface friendsFieldRefs {
    readonly user_id: FieldRef<"friends", 'String'>
    readonly friend_id: FieldRef<"friends", 'String'>
    readonly created_at: FieldRef<"friends", 'DateTime'>
    readonly streak: FieldRef<"friends", 'Int'>
    readonly total_xp: FieldRef<"friends", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * friends findUnique
   */
  export type friendsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * Filter, which friends to fetch.
     */
    where: friendsWhereUniqueInput
  }

  /**
   * friends findUniqueOrThrow
   */
  export type friendsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * Filter, which friends to fetch.
     */
    where: friendsWhereUniqueInput
  }

  /**
   * friends findFirst
   */
  export type friendsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * Filter, which friends to fetch.
     */
    where?: friendsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friends to fetch.
     */
    orderBy?: friendsOrderByWithRelationInput | friendsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for friends.
     */
    cursor?: friendsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of friends.
     */
    distinct?: FriendsScalarFieldEnum | FriendsScalarFieldEnum[]
  }

  /**
   * friends findFirstOrThrow
   */
  export type friendsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * Filter, which friends to fetch.
     */
    where?: friendsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friends to fetch.
     */
    orderBy?: friendsOrderByWithRelationInput | friendsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for friends.
     */
    cursor?: friendsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of friends.
     */
    distinct?: FriendsScalarFieldEnum | FriendsScalarFieldEnum[]
  }

  /**
   * friends findMany
   */
  export type friendsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * Filter, which friends to fetch.
     */
    where?: friendsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of friends to fetch.
     */
    orderBy?: friendsOrderByWithRelationInput | friendsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing friends.
     */
    cursor?: friendsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of friends.
     */
    distinct?: FriendsScalarFieldEnum | FriendsScalarFieldEnum[]
  }

  /**
   * friends create
   */
  export type friendsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * The data needed to create a friends.
     */
    data: XOR<friendsCreateInput, friendsUncheckedCreateInput>
  }

  /**
   * friends createMany
   */
  export type friendsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many friends.
     */
    data: friendsCreateManyInput | friendsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * friends createManyAndReturn
   */
  export type friendsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * The data used to create many friends.
     */
    data: friendsCreateManyInput | friendsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * friends update
   */
  export type friendsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * The data needed to update a friends.
     */
    data: XOR<friendsUpdateInput, friendsUncheckedUpdateInput>
    /**
     * Choose, which friends to update.
     */
    where: friendsWhereUniqueInput
  }

  /**
   * friends updateMany
   */
  export type friendsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update friends.
     */
    data: XOR<friendsUpdateManyMutationInput, friendsUncheckedUpdateManyInput>
    /**
     * Filter which friends to update
     */
    where?: friendsWhereInput
    /**
     * Limit how many friends to update.
     */
    limit?: number
  }

  /**
   * friends updateManyAndReturn
   */
  export type friendsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * The data used to update friends.
     */
    data: XOR<friendsUpdateManyMutationInput, friendsUncheckedUpdateManyInput>
    /**
     * Filter which friends to update
     */
    where?: friendsWhereInput
    /**
     * Limit how many friends to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * friends upsert
   */
  export type friendsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * The filter to search for the friends to update in case it exists.
     */
    where: friendsWhereUniqueInput
    /**
     * In case the friends found by the `where` argument doesn't exist, create a new friends with this data.
     */
    create: XOR<friendsCreateInput, friendsUncheckedCreateInput>
    /**
     * In case the friends was found with the provided `where` argument, update it with this data.
     */
    update: XOR<friendsUpdateInput, friendsUncheckedUpdateInput>
  }

  /**
   * friends delete
   */
  export type friendsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    /**
     * Filter which friends to delete.
     */
    where: friendsWhereUniqueInput
  }

  /**
   * friends deleteMany
   */
  export type friendsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which friends to delete
     */
    where?: friendsWhereInput
    /**
     * Limit how many friends to delete.
     */
    limit?: number
  }

  /**
   * friends without action
   */
  export type friendsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
  }


  /**
   * Model topics
   */

  export type AggregateTopics = {
    _count: TopicsCountAggregateOutputType | null
    _min: TopicsMinAggregateOutputType | null
    _max: TopicsMaxAggregateOutputType | null
  }

  export type TopicsMinAggregateOutputType = {
    id: string | null
    class_code: string | null
    name: string | null
  }

  export type TopicsMaxAggregateOutputType = {
    id: string | null
    class_code: string | null
    name: string | null
  }

  export type TopicsCountAggregateOutputType = {
    id: number
    class_code: number
    name: number
    _all: number
  }


  export type TopicsMinAggregateInputType = {
    id?: true
    class_code?: true
    name?: true
  }

  export type TopicsMaxAggregateInputType = {
    id?: true
    class_code?: true
    name?: true
  }

  export type TopicsCountAggregateInputType = {
    id?: true
    class_code?: true
    name?: true
    _all?: true
  }

  export type TopicsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which topics to aggregate.
     */
    where?: topicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicsOrderByWithRelationInput | topicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: topicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned topics
    **/
    _count?: true | TopicsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TopicsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TopicsMaxAggregateInputType
  }

  export type GetTopicsAggregateType<T extends TopicsAggregateArgs> = {
        [P in keyof T & keyof AggregateTopics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopics[P]>
      : GetScalarType<T[P], AggregateTopics[P]>
  }




  export type topicsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: topicsWhereInput
    orderBy?: topicsOrderByWithAggregationInput | topicsOrderByWithAggregationInput[]
    by: TopicsScalarFieldEnum[] | TopicsScalarFieldEnum
    having?: topicsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TopicsCountAggregateInputType | true
    _min?: TopicsMinAggregateInputType
    _max?: TopicsMaxAggregateInputType
  }

  export type TopicsGroupByOutputType = {
    id: string
    class_code: string
    name: string
    _count: TopicsCountAggregateOutputType | null
    _min: TopicsMinAggregateOutputType | null
    _max: TopicsMaxAggregateOutputType | null
  }

  type GetTopicsGroupByPayload<T extends topicsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TopicsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TopicsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TopicsGroupByOutputType[P]>
            : GetScalarType<T[P], TopicsGroupByOutputType[P]>
        }
      >
    >


  export type topicsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class_code?: boolean
    name?: boolean
    chat_sessions?: boolean | topics$chat_sessionsArgs<ExtArgs>
    daily_topic_metrics?: boolean | topics$daily_topic_metricsArgs<ExtArgs>
    classes?: boolean | classesDefaultArgs<ExtArgs>
    _count?: boolean | TopicsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topics"]>

  export type topicsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class_code?: boolean
    name?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topics"]>

  export type topicsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    class_code?: boolean
    name?: boolean
    classes?: boolean | classesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topics"]>

  export type topicsSelectScalar = {
    id?: boolean
    class_code?: boolean
    name?: boolean
  }

  export type topicsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "class_code" | "name", ExtArgs["result"]["topics"]>
  export type topicsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat_sessions?: boolean | topics$chat_sessionsArgs<ExtArgs>
    daily_topic_metrics?: boolean | topics$daily_topic_metricsArgs<ExtArgs>
    classes?: boolean | classesDefaultArgs<ExtArgs>
    _count?: boolean | TopicsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type topicsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
  }
  export type topicsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | classesDefaultArgs<ExtArgs>
  }

  export type $topicsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "topics"
    objects: {
      chat_sessions: Prisma.$chat_sessionsPayload<ExtArgs>[]
      daily_topic_metrics: Prisma.$daily_topic_metricsPayload<ExtArgs>[]
      classes: Prisma.$classesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      class_code: string
      name: string
    }, ExtArgs["result"]["topics"]>
    composites: {}
  }

  type topicsGetPayload<S extends boolean | null | undefined | topicsDefaultArgs> = $Result.GetResult<Prisma.$topicsPayload, S>

  type topicsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<topicsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TopicsCountAggregateInputType | true
    }

  export interface topicsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['topics'], meta: { name: 'topics' } }
    /**
     * Find zero or one Topics that matches the filter.
     * @param {topicsFindUniqueArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends topicsFindUniqueArgs>(args: SelectSubset<T, topicsFindUniqueArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Topics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {topicsFindUniqueOrThrowArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends topicsFindUniqueOrThrowArgs>(args: SelectSubset<T, topicsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicsFindFirstArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends topicsFindFirstArgs>(args?: SelectSubset<T, topicsFindFirstArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicsFindFirstOrThrowArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends topicsFindFirstOrThrowArgs>(args?: SelectSubset<T, topicsFindFirstOrThrowArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Topics
     * const topics = await prisma.topics.findMany()
     * 
     * // Get first 10 Topics
     * const topics = await prisma.topics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const topicsWithIdOnly = await prisma.topics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends topicsFindManyArgs>(args?: SelectSubset<T, topicsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Topics.
     * @param {topicsCreateArgs} args - Arguments to create a Topics.
     * @example
     * // Create one Topics
     * const Topics = await prisma.topics.create({
     *   data: {
     *     // ... data to create a Topics
     *   }
     * })
     * 
     */
    create<T extends topicsCreateArgs>(args: SelectSubset<T, topicsCreateArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Topics.
     * @param {topicsCreateManyArgs} args - Arguments to create many Topics.
     * @example
     * // Create many Topics
     * const topics = await prisma.topics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends topicsCreateManyArgs>(args?: SelectSubset<T, topicsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Topics and returns the data saved in the database.
     * @param {topicsCreateManyAndReturnArgs} args - Arguments to create many Topics.
     * @example
     * // Create many Topics
     * const topics = await prisma.topics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Topics and only return the `id`
     * const topicsWithIdOnly = await prisma.topics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends topicsCreateManyAndReturnArgs>(args?: SelectSubset<T, topicsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Topics.
     * @param {topicsDeleteArgs} args - Arguments to delete one Topics.
     * @example
     * // Delete one Topics
     * const Topics = await prisma.topics.delete({
     *   where: {
     *     // ... filter to delete one Topics
     *   }
     * })
     * 
     */
    delete<T extends topicsDeleteArgs>(args: SelectSubset<T, topicsDeleteArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Topics.
     * @param {topicsUpdateArgs} args - Arguments to update one Topics.
     * @example
     * // Update one Topics
     * const topics = await prisma.topics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends topicsUpdateArgs>(args: SelectSubset<T, topicsUpdateArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Topics.
     * @param {topicsDeleteManyArgs} args - Arguments to filter Topics to delete.
     * @example
     * // Delete a few Topics
     * const { count } = await prisma.topics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends topicsDeleteManyArgs>(args?: SelectSubset<T, topicsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Topics
     * const topics = await prisma.topics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends topicsUpdateManyArgs>(args: SelectSubset<T, topicsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics and returns the data updated in the database.
     * @param {topicsUpdateManyAndReturnArgs} args - Arguments to update many Topics.
     * @example
     * // Update many Topics
     * const topics = await prisma.topics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Topics and only return the `id`
     * const topicsWithIdOnly = await prisma.topics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends topicsUpdateManyAndReturnArgs>(args: SelectSubset<T, topicsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Topics.
     * @param {topicsUpsertArgs} args - Arguments to update or create a Topics.
     * @example
     * // Update or create a Topics
     * const topics = await prisma.topics.upsert({
     *   create: {
     *     // ... data to create a Topics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Topics we want to update
     *   }
     * })
     */
    upsert<T extends topicsUpsertArgs>(args: SelectSubset<T, topicsUpsertArgs<ExtArgs>>): Prisma__topicsClient<$Result.GetResult<Prisma.$topicsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicsCountArgs} args - Arguments to filter Topics to count.
     * @example
     * // Count the number of Topics
     * const count = await prisma.topics.count({
     *   where: {
     *     // ... the filter for the Topics we want to count
     *   }
     * })
    **/
    count<T extends topicsCountArgs>(
      args?: Subset<T, topicsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TopicsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TopicsAggregateArgs>(args: Subset<T, TopicsAggregateArgs>): Prisma.PrismaPromise<GetTopicsAggregateType<T>>

    /**
     * Group by Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends topicsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: topicsGroupByArgs['orderBy'] }
        : { orderBy?: topicsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, topicsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopicsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the topics model
   */
  readonly fields: topicsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for topics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__topicsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat_sessions<T extends topics$chat_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, topics$chat_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    daily_topic_metrics<T extends topics$daily_topic_metricsArgs<ExtArgs> = {}>(args?: Subset<T, topics$daily_topic_metricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    classes<T extends classesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, classesDefaultArgs<ExtArgs>>): Prisma__classesClient<$Result.GetResult<Prisma.$classesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the topics model
   */
  interface topicsFieldRefs {
    readonly id: FieldRef<"topics", 'String'>
    readonly class_code: FieldRef<"topics", 'String'>
    readonly name: FieldRef<"topics", 'String'>
  }
    

  // Custom InputTypes
  /**
   * topics findUnique
   */
  export type topicsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * Filter, which topics to fetch.
     */
    where: topicsWhereUniqueInput
  }

  /**
   * topics findUniqueOrThrow
   */
  export type topicsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * Filter, which topics to fetch.
     */
    where: topicsWhereUniqueInput
  }

  /**
   * topics findFirst
   */
  export type topicsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * Filter, which topics to fetch.
     */
    where?: topicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicsOrderByWithRelationInput | topicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for topics.
     */
    cursor?: topicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of topics.
     */
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }

  /**
   * topics findFirstOrThrow
   */
  export type topicsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * Filter, which topics to fetch.
     */
    where?: topicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicsOrderByWithRelationInput | topicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for topics.
     */
    cursor?: topicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of topics.
     */
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }

  /**
   * topics findMany
   */
  export type topicsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * Filter, which topics to fetch.
     */
    where?: topicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicsOrderByWithRelationInput | topicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing topics.
     */
    cursor?: topicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of topics.
     */
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }

  /**
   * topics create
   */
  export type topicsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * The data needed to create a topics.
     */
    data: XOR<topicsCreateInput, topicsUncheckedCreateInput>
  }

  /**
   * topics createMany
   */
  export type topicsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many topics.
     */
    data: topicsCreateManyInput | topicsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * topics createManyAndReturn
   */
  export type topicsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * The data used to create many topics.
     */
    data: topicsCreateManyInput | topicsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * topics update
   */
  export type topicsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * The data needed to update a topics.
     */
    data: XOR<topicsUpdateInput, topicsUncheckedUpdateInput>
    /**
     * Choose, which topics to update.
     */
    where: topicsWhereUniqueInput
  }

  /**
   * topics updateMany
   */
  export type topicsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update topics.
     */
    data: XOR<topicsUpdateManyMutationInput, topicsUncheckedUpdateManyInput>
    /**
     * Filter which topics to update
     */
    where?: topicsWhereInput
    /**
     * Limit how many topics to update.
     */
    limit?: number
  }

  /**
   * topics updateManyAndReturn
   */
  export type topicsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * The data used to update topics.
     */
    data: XOR<topicsUpdateManyMutationInput, topicsUncheckedUpdateManyInput>
    /**
     * Filter which topics to update
     */
    where?: topicsWhereInput
    /**
     * Limit how many topics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * topics upsert
   */
  export type topicsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * The filter to search for the topics to update in case it exists.
     */
    where: topicsWhereUniqueInput
    /**
     * In case the topics found by the `where` argument doesn't exist, create a new topics with this data.
     */
    create: XOR<topicsCreateInput, topicsUncheckedCreateInput>
    /**
     * In case the topics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<topicsUpdateInput, topicsUncheckedUpdateInput>
  }

  /**
   * topics delete
   */
  export type topicsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
    /**
     * Filter which topics to delete.
     */
    where: topicsWhereUniqueInput
  }

  /**
   * topics deleteMany
   */
  export type topicsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which topics to delete
     */
    where?: topicsWhereInput
    /**
     * Limit how many topics to delete.
     */
    limit?: number
  }

  /**
   * topics.chat_sessions
   */
  export type topics$chat_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    where?: chat_sessionsWhereInput
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    cursor?: chat_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Chat_sessionsScalarFieldEnum | Chat_sessionsScalarFieldEnum[]
  }

  /**
   * topics.daily_topic_metrics
   */
  export type topics$daily_topic_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    where?: daily_topic_metricsWhereInput
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    cursor?: daily_topic_metricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Daily_topic_metricsScalarFieldEnum | Daily_topic_metricsScalarFieldEnum[]
  }

  /**
   * topics without action
   */
  export type topicsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topics
     */
    select?: topicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topics
     */
    omit?: topicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicsInclude<ExtArgs> | null
  }


  /**
   * Model user_achievements
   */

  export type AggregateUser_achievements = {
    _count: User_achievementsCountAggregateOutputType | null
    _min: User_achievementsMinAggregateOutputType | null
    _max: User_achievementsMaxAggregateOutputType | null
  }

  export type User_achievementsMinAggregateOutputType = {
    user_id: string | null
    achievement_id: string | null
    earned_at: Date | null
  }

  export type User_achievementsMaxAggregateOutputType = {
    user_id: string | null
    achievement_id: string | null
    earned_at: Date | null
  }

  export type User_achievementsCountAggregateOutputType = {
    user_id: number
    achievement_id: number
    earned_at: number
    _all: number
  }


  export type User_achievementsMinAggregateInputType = {
    user_id?: true
    achievement_id?: true
    earned_at?: true
  }

  export type User_achievementsMaxAggregateInputType = {
    user_id?: true
    achievement_id?: true
    earned_at?: true
  }

  export type User_achievementsCountAggregateInputType = {
    user_id?: true
    achievement_id?: true
    earned_at?: true
    _all?: true
  }

  export type User_achievementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_achievements to aggregate.
     */
    where?: user_achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_achievements to fetch.
     */
    orderBy?: user_achievementsOrderByWithRelationInput | user_achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_achievements
    **/
    _count?: true | User_achievementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_achievementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_achievementsMaxAggregateInputType
  }

  export type GetUser_achievementsAggregateType<T extends User_achievementsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_achievements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_achievements[P]>
      : GetScalarType<T[P], AggregateUser_achievements[P]>
  }




  export type user_achievementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_achievementsWhereInput
    orderBy?: user_achievementsOrderByWithAggregationInput | user_achievementsOrderByWithAggregationInput[]
    by: User_achievementsScalarFieldEnum[] | User_achievementsScalarFieldEnum
    having?: user_achievementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_achievementsCountAggregateInputType | true
    _min?: User_achievementsMinAggregateInputType
    _max?: User_achievementsMaxAggregateInputType
  }

  export type User_achievementsGroupByOutputType = {
    user_id: string
    achievement_id: string
    earned_at: Date | null
    _count: User_achievementsCountAggregateOutputType | null
    _min: User_achievementsMinAggregateOutputType | null
    _max: User_achievementsMaxAggregateOutputType | null
  }

  type GetUser_achievementsGroupByPayload<T extends user_achievementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_achievementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_achievementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_achievementsGroupByOutputType[P]>
            : GetScalarType<T[P], User_achievementsGroupByOutputType[P]>
        }
      >
    >


  export type user_achievementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    achievement_id?: boolean
    earned_at?: boolean
    achievements?: boolean | achievementsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_achievements"]>

  export type user_achievementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    achievement_id?: boolean
    earned_at?: boolean
    achievements?: boolean | achievementsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_achievements"]>

  export type user_achievementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    achievement_id?: boolean
    earned_at?: boolean
    achievements?: boolean | achievementsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_achievements"]>

  export type user_achievementsSelectScalar = {
    user_id?: boolean
    achievement_id?: boolean
    earned_at?: boolean
  }

  export type user_achievementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "achievement_id" | "earned_at", ExtArgs["result"]["user_achievements"]>
  export type user_achievementsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievements?: boolean | achievementsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type user_achievementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievements?: boolean | achievementsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type user_achievementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievements?: boolean | achievementsDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $user_achievementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_achievements"
    objects: {
      achievements: Prisma.$achievementsPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      achievement_id: string
      earned_at: Date | null
    }, ExtArgs["result"]["user_achievements"]>
    composites: {}
  }

  type user_achievementsGetPayload<S extends boolean | null | undefined | user_achievementsDefaultArgs> = $Result.GetResult<Prisma.$user_achievementsPayload, S>

  type user_achievementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_achievementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_achievementsCountAggregateInputType | true
    }

  export interface user_achievementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_achievements'], meta: { name: 'user_achievements' } }
    /**
     * Find zero or one User_achievements that matches the filter.
     * @param {user_achievementsFindUniqueArgs} args - Arguments to find a User_achievements
     * @example
     * // Get one User_achievements
     * const user_achievements = await prisma.user_achievements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_achievementsFindUniqueArgs>(args: SelectSubset<T, user_achievementsFindUniqueArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_achievements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_achievementsFindUniqueOrThrowArgs} args - Arguments to find a User_achievements
     * @example
     * // Get one User_achievements
     * const user_achievements = await prisma.user_achievements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_achievementsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_achievementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_achievementsFindFirstArgs} args - Arguments to find a User_achievements
     * @example
     * // Get one User_achievements
     * const user_achievements = await prisma.user_achievements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_achievementsFindFirstArgs>(args?: SelectSubset<T, user_achievementsFindFirstArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_achievements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_achievementsFindFirstOrThrowArgs} args - Arguments to find a User_achievements
     * @example
     * // Get one User_achievements
     * const user_achievements = await prisma.user_achievements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_achievementsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_achievementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_achievementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_achievements
     * const user_achievements = await prisma.user_achievements.findMany()
     * 
     * // Get first 10 User_achievements
     * const user_achievements = await prisma.user_achievements.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const user_achievementsWithUser_idOnly = await prisma.user_achievements.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends user_achievementsFindManyArgs>(args?: SelectSubset<T, user_achievementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_achievements.
     * @param {user_achievementsCreateArgs} args - Arguments to create a User_achievements.
     * @example
     * // Create one User_achievements
     * const User_achievements = await prisma.user_achievements.create({
     *   data: {
     *     // ... data to create a User_achievements
     *   }
     * })
     * 
     */
    create<T extends user_achievementsCreateArgs>(args: SelectSubset<T, user_achievementsCreateArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_achievements.
     * @param {user_achievementsCreateManyArgs} args - Arguments to create many User_achievements.
     * @example
     * // Create many User_achievements
     * const user_achievements = await prisma.user_achievements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_achievementsCreateManyArgs>(args?: SelectSubset<T, user_achievementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_achievements and returns the data saved in the database.
     * @param {user_achievementsCreateManyAndReturnArgs} args - Arguments to create many User_achievements.
     * @example
     * // Create many User_achievements
     * const user_achievements = await prisma.user_achievements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_achievements and only return the `user_id`
     * const user_achievementsWithUser_idOnly = await prisma.user_achievements.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_achievementsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_achievementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_achievements.
     * @param {user_achievementsDeleteArgs} args - Arguments to delete one User_achievements.
     * @example
     * // Delete one User_achievements
     * const User_achievements = await prisma.user_achievements.delete({
     *   where: {
     *     // ... filter to delete one User_achievements
     *   }
     * })
     * 
     */
    delete<T extends user_achievementsDeleteArgs>(args: SelectSubset<T, user_achievementsDeleteArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_achievements.
     * @param {user_achievementsUpdateArgs} args - Arguments to update one User_achievements.
     * @example
     * // Update one User_achievements
     * const user_achievements = await prisma.user_achievements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_achievementsUpdateArgs>(args: SelectSubset<T, user_achievementsUpdateArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_achievements.
     * @param {user_achievementsDeleteManyArgs} args - Arguments to filter User_achievements to delete.
     * @example
     * // Delete a few User_achievements
     * const { count } = await prisma.user_achievements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_achievementsDeleteManyArgs>(args?: SelectSubset<T, user_achievementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_achievementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_achievements
     * const user_achievements = await prisma.user_achievements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_achievementsUpdateManyArgs>(args: SelectSubset<T, user_achievementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_achievements and returns the data updated in the database.
     * @param {user_achievementsUpdateManyAndReturnArgs} args - Arguments to update many User_achievements.
     * @example
     * // Update many User_achievements
     * const user_achievements = await prisma.user_achievements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_achievements and only return the `user_id`
     * const user_achievementsWithUser_idOnly = await prisma.user_achievements.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_achievementsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_achievementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_achievements.
     * @param {user_achievementsUpsertArgs} args - Arguments to update or create a User_achievements.
     * @example
     * // Update or create a User_achievements
     * const user_achievements = await prisma.user_achievements.upsert({
     *   create: {
     *     // ... data to create a User_achievements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_achievements we want to update
     *   }
     * })
     */
    upsert<T extends user_achievementsUpsertArgs>(args: SelectSubset<T, user_achievementsUpsertArgs<ExtArgs>>): Prisma__user_achievementsClient<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_achievementsCountArgs} args - Arguments to filter User_achievements to count.
     * @example
     * // Count the number of User_achievements
     * const count = await prisma.user_achievements.count({
     *   where: {
     *     // ... the filter for the User_achievements we want to count
     *   }
     * })
    **/
    count<T extends user_achievementsCountArgs>(
      args?: Subset<T, user_achievementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_achievementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_achievementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_achievementsAggregateArgs>(args: Subset<T, User_achievementsAggregateArgs>): Prisma.PrismaPromise<GetUser_achievementsAggregateType<T>>

    /**
     * Group by User_achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_achievementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_achievementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_achievementsGroupByArgs['orderBy'] }
        : { orderBy?: user_achievementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_achievementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_achievementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_achievements model
   */
  readonly fields: user_achievementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_achievements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_achievementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    achievements<T extends achievementsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, achievementsDefaultArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_achievements model
   */
  interface user_achievementsFieldRefs {
    readonly user_id: FieldRef<"user_achievements", 'String'>
    readonly achievement_id: FieldRef<"user_achievements", 'String'>
    readonly earned_at: FieldRef<"user_achievements", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_achievements findUnique
   */
  export type user_achievementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * Filter, which user_achievements to fetch.
     */
    where: user_achievementsWhereUniqueInput
  }

  /**
   * user_achievements findUniqueOrThrow
   */
  export type user_achievementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * Filter, which user_achievements to fetch.
     */
    where: user_achievementsWhereUniqueInput
  }

  /**
   * user_achievements findFirst
   */
  export type user_achievementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * Filter, which user_achievements to fetch.
     */
    where?: user_achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_achievements to fetch.
     */
    orderBy?: user_achievementsOrderByWithRelationInput | user_achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_achievements.
     */
    cursor?: user_achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_achievements.
     */
    distinct?: User_achievementsScalarFieldEnum | User_achievementsScalarFieldEnum[]
  }

  /**
   * user_achievements findFirstOrThrow
   */
  export type user_achievementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * Filter, which user_achievements to fetch.
     */
    where?: user_achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_achievements to fetch.
     */
    orderBy?: user_achievementsOrderByWithRelationInput | user_achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_achievements.
     */
    cursor?: user_achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_achievements.
     */
    distinct?: User_achievementsScalarFieldEnum | User_achievementsScalarFieldEnum[]
  }

  /**
   * user_achievements findMany
   */
  export type user_achievementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * Filter, which user_achievements to fetch.
     */
    where?: user_achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_achievements to fetch.
     */
    orderBy?: user_achievementsOrderByWithRelationInput | user_achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_achievements.
     */
    cursor?: user_achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_achievements.
     */
    distinct?: User_achievementsScalarFieldEnum | User_achievementsScalarFieldEnum[]
  }

  /**
   * user_achievements create
   */
  export type user_achievementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_achievements.
     */
    data: XOR<user_achievementsCreateInput, user_achievementsUncheckedCreateInput>
  }

  /**
   * user_achievements createMany
   */
  export type user_achievementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_achievements.
     */
    data: user_achievementsCreateManyInput | user_achievementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_achievements createManyAndReturn
   */
  export type user_achievementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * The data used to create many user_achievements.
     */
    data: user_achievementsCreateManyInput | user_achievementsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_achievements update
   */
  export type user_achievementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_achievements.
     */
    data: XOR<user_achievementsUpdateInput, user_achievementsUncheckedUpdateInput>
    /**
     * Choose, which user_achievements to update.
     */
    where: user_achievementsWhereUniqueInput
  }

  /**
   * user_achievements updateMany
   */
  export type user_achievementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_achievements.
     */
    data: XOR<user_achievementsUpdateManyMutationInput, user_achievementsUncheckedUpdateManyInput>
    /**
     * Filter which user_achievements to update
     */
    where?: user_achievementsWhereInput
    /**
     * Limit how many user_achievements to update.
     */
    limit?: number
  }

  /**
   * user_achievements updateManyAndReturn
   */
  export type user_achievementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * The data used to update user_achievements.
     */
    data: XOR<user_achievementsUpdateManyMutationInput, user_achievementsUncheckedUpdateManyInput>
    /**
     * Filter which user_achievements to update
     */
    where?: user_achievementsWhereInput
    /**
     * Limit how many user_achievements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_achievements upsert
   */
  export type user_achievementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_achievements to update in case it exists.
     */
    where: user_achievementsWhereUniqueInput
    /**
     * In case the user_achievements found by the `where` argument doesn't exist, create a new user_achievements with this data.
     */
    create: XOR<user_achievementsCreateInput, user_achievementsUncheckedCreateInput>
    /**
     * In case the user_achievements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_achievementsUpdateInput, user_achievementsUncheckedUpdateInput>
  }

  /**
   * user_achievements delete
   */
  export type user_achievementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    /**
     * Filter which user_achievements to delete.
     */
    where: user_achievementsWhereUniqueInput
  }

  /**
   * user_achievements deleteMany
   */
  export type user_achievementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_achievements to delete
     */
    where?: user_achievementsWhereInput
    /**
     * Limit how many user_achievements to delete.
     */
    limit?: number
  }

  /**
   * user_achievements without action
   */
  export type user_achievementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
  }


  /**
   * Model xp_system
   */

  export type AggregateXp_system = {
    _count: Xp_systemCountAggregateOutputType | null
    _avg: Xp_systemAvgAggregateOutputType | null
    _sum: Xp_systemSumAggregateOutputType | null
    _min: Xp_systemMinAggregateOutputType | null
    _max: Xp_systemMaxAggregateOutputType | null
  }

  export type Xp_systemAvgAggregateOutputType = {
    amount: number | null
  }

  export type Xp_systemSumAggregateOutputType = {
    amount: number | null
  }

  export type Xp_systemMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    source: string | null
    amount: number | null
    created_at: Date | null
  }

  export type Xp_systemMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    source: string | null
    amount: number | null
    created_at: Date | null
  }

  export type Xp_systemCountAggregateOutputType = {
    id: number
    user_id: number
    source: number
    amount: number
    created_at: number
    _all: number
  }


  export type Xp_systemAvgAggregateInputType = {
    amount?: true
  }

  export type Xp_systemSumAggregateInputType = {
    amount?: true
  }

  export type Xp_systemMinAggregateInputType = {
    id?: true
    user_id?: true
    source?: true
    amount?: true
    created_at?: true
  }

  export type Xp_systemMaxAggregateInputType = {
    id?: true
    user_id?: true
    source?: true
    amount?: true
    created_at?: true
  }

  export type Xp_systemCountAggregateInputType = {
    id?: true
    user_id?: true
    source?: true
    amount?: true
    created_at?: true
    _all?: true
  }

  export type Xp_systemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which xp_system to aggregate.
     */
    where?: xp_systemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xp_systems to fetch.
     */
    orderBy?: xp_systemOrderByWithRelationInput | xp_systemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: xp_systemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xp_systems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xp_systems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned xp_systems
    **/
    _count?: true | Xp_systemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Xp_systemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Xp_systemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Xp_systemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Xp_systemMaxAggregateInputType
  }

  export type GetXp_systemAggregateType<T extends Xp_systemAggregateArgs> = {
        [P in keyof T & keyof AggregateXp_system]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateXp_system[P]>
      : GetScalarType<T[P], AggregateXp_system[P]>
  }




  export type xp_systemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: xp_systemWhereInput
    orderBy?: xp_systemOrderByWithAggregationInput | xp_systemOrderByWithAggregationInput[]
    by: Xp_systemScalarFieldEnum[] | Xp_systemScalarFieldEnum
    having?: xp_systemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Xp_systemCountAggregateInputType | true
    _avg?: Xp_systemAvgAggregateInputType
    _sum?: Xp_systemSumAggregateInputType
    _min?: Xp_systemMinAggregateInputType
    _max?: Xp_systemMaxAggregateInputType
  }

  export type Xp_systemGroupByOutputType = {
    id: string
    user_id: string
    source: string
    amount: number
    created_at: Date | null
    _count: Xp_systemCountAggregateOutputType | null
    _avg: Xp_systemAvgAggregateOutputType | null
    _sum: Xp_systemSumAggregateOutputType | null
    _min: Xp_systemMinAggregateOutputType | null
    _max: Xp_systemMaxAggregateOutputType | null
  }

  type GetXp_systemGroupByPayload<T extends xp_systemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Xp_systemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Xp_systemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Xp_systemGroupByOutputType[P]>
            : GetScalarType<T[P], Xp_systemGroupByOutputType[P]>
        }
      >
    >


  export type xp_systemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    source?: boolean
    amount?: boolean
    created_at?: boolean
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xp_system"]>

  export type xp_systemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    source?: boolean
    amount?: boolean
    created_at?: boolean
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xp_system"]>

  export type xp_systemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    source?: boolean
    amount?: boolean
    created_at?: boolean
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xp_system"]>

  export type xp_systemSelectScalar = {
    id?: boolean
    user_id?: boolean
    source?: boolean
    amount?: boolean
    created_at?: boolean
  }

  export type xp_systemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "source" | "amount" | "created_at", ExtArgs["result"]["xp_system"]>
  export type xp_systemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type xp_systemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type xp_systemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $xp_systemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "xp_system"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      source: string
      amount: number
      created_at: Date | null
    }, ExtArgs["result"]["xp_system"]>
    composites: {}
  }

  type xp_systemGetPayload<S extends boolean | null | undefined | xp_systemDefaultArgs> = $Result.GetResult<Prisma.$xp_systemPayload, S>

  type xp_systemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<xp_systemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Xp_systemCountAggregateInputType | true
    }

  export interface xp_systemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['xp_system'], meta: { name: 'xp_system' } }
    /**
     * Find zero or one Xp_system that matches the filter.
     * @param {xp_systemFindUniqueArgs} args - Arguments to find a Xp_system
     * @example
     * // Get one Xp_system
     * const xp_system = await prisma.xp_system.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends xp_systemFindUniqueArgs>(args: SelectSubset<T, xp_systemFindUniqueArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Xp_system that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {xp_systemFindUniqueOrThrowArgs} args - Arguments to find a Xp_system
     * @example
     * // Get one Xp_system
     * const xp_system = await prisma.xp_system.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends xp_systemFindUniqueOrThrowArgs>(args: SelectSubset<T, xp_systemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Xp_system that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xp_systemFindFirstArgs} args - Arguments to find a Xp_system
     * @example
     * // Get one Xp_system
     * const xp_system = await prisma.xp_system.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends xp_systemFindFirstArgs>(args?: SelectSubset<T, xp_systemFindFirstArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Xp_system that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xp_systemFindFirstOrThrowArgs} args - Arguments to find a Xp_system
     * @example
     * // Get one Xp_system
     * const xp_system = await prisma.xp_system.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends xp_systemFindFirstOrThrowArgs>(args?: SelectSubset<T, xp_systemFindFirstOrThrowArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Xp_systems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xp_systemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Xp_systems
     * const xp_systems = await prisma.xp_system.findMany()
     * 
     * // Get first 10 Xp_systems
     * const xp_systems = await prisma.xp_system.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const xp_systemWithIdOnly = await prisma.xp_system.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends xp_systemFindManyArgs>(args?: SelectSubset<T, xp_systemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Xp_system.
     * @param {xp_systemCreateArgs} args - Arguments to create a Xp_system.
     * @example
     * // Create one Xp_system
     * const Xp_system = await prisma.xp_system.create({
     *   data: {
     *     // ... data to create a Xp_system
     *   }
     * })
     * 
     */
    create<T extends xp_systemCreateArgs>(args: SelectSubset<T, xp_systemCreateArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Xp_systems.
     * @param {xp_systemCreateManyArgs} args - Arguments to create many Xp_systems.
     * @example
     * // Create many Xp_systems
     * const xp_system = await prisma.xp_system.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends xp_systemCreateManyArgs>(args?: SelectSubset<T, xp_systemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Xp_systems and returns the data saved in the database.
     * @param {xp_systemCreateManyAndReturnArgs} args - Arguments to create many Xp_systems.
     * @example
     * // Create many Xp_systems
     * const xp_system = await prisma.xp_system.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Xp_systems and only return the `id`
     * const xp_systemWithIdOnly = await prisma.xp_system.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends xp_systemCreateManyAndReturnArgs>(args?: SelectSubset<T, xp_systemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Xp_system.
     * @param {xp_systemDeleteArgs} args - Arguments to delete one Xp_system.
     * @example
     * // Delete one Xp_system
     * const Xp_system = await prisma.xp_system.delete({
     *   where: {
     *     // ... filter to delete one Xp_system
     *   }
     * })
     * 
     */
    delete<T extends xp_systemDeleteArgs>(args: SelectSubset<T, xp_systemDeleteArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Xp_system.
     * @param {xp_systemUpdateArgs} args - Arguments to update one Xp_system.
     * @example
     * // Update one Xp_system
     * const xp_system = await prisma.xp_system.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends xp_systemUpdateArgs>(args: SelectSubset<T, xp_systemUpdateArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Xp_systems.
     * @param {xp_systemDeleteManyArgs} args - Arguments to filter Xp_systems to delete.
     * @example
     * // Delete a few Xp_systems
     * const { count } = await prisma.xp_system.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends xp_systemDeleteManyArgs>(args?: SelectSubset<T, xp_systemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Xp_systems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xp_systemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Xp_systems
     * const xp_system = await prisma.xp_system.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends xp_systemUpdateManyArgs>(args: SelectSubset<T, xp_systemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Xp_systems and returns the data updated in the database.
     * @param {xp_systemUpdateManyAndReturnArgs} args - Arguments to update many Xp_systems.
     * @example
     * // Update many Xp_systems
     * const xp_system = await prisma.xp_system.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Xp_systems and only return the `id`
     * const xp_systemWithIdOnly = await prisma.xp_system.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends xp_systemUpdateManyAndReturnArgs>(args: SelectSubset<T, xp_systemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Xp_system.
     * @param {xp_systemUpsertArgs} args - Arguments to update or create a Xp_system.
     * @example
     * // Update or create a Xp_system
     * const xp_system = await prisma.xp_system.upsert({
     *   create: {
     *     // ... data to create a Xp_system
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Xp_system we want to update
     *   }
     * })
     */
    upsert<T extends xp_systemUpsertArgs>(args: SelectSubset<T, xp_systemUpsertArgs<ExtArgs>>): Prisma__xp_systemClient<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Xp_systems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xp_systemCountArgs} args - Arguments to filter Xp_systems to count.
     * @example
     * // Count the number of Xp_systems
     * const count = await prisma.xp_system.count({
     *   where: {
     *     // ... the filter for the Xp_systems we want to count
     *   }
     * })
    **/
    count<T extends xp_systemCountArgs>(
      args?: Subset<T, xp_systemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Xp_systemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Xp_system.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Xp_systemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Xp_systemAggregateArgs>(args: Subset<T, Xp_systemAggregateArgs>): Prisma.PrismaPromise<GetXp_systemAggregateType<T>>

    /**
     * Group by Xp_system.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {xp_systemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends xp_systemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: xp_systemGroupByArgs['orderBy'] }
        : { orderBy?: xp_systemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, xp_systemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetXp_systemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the xp_system model
   */
  readonly fields: xp_systemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for xp_system.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__xp_systemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the xp_system model
   */
  interface xp_systemFieldRefs {
    readonly id: FieldRef<"xp_system", 'String'>
    readonly user_id: FieldRef<"xp_system", 'String'>
    readonly source: FieldRef<"xp_system", 'String'>
    readonly amount: FieldRef<"xp_system", 'Int'>
    readonly created_at: FieldRef<"xp_system", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * xp_system findUnique
   */
  export type xp_systemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * Filter, which xp_system to fetch.
     */
    where: xp_systemWhereUniqueInput
  }

  /**
   * xp_system findUniqueOrThrow
   */
  export type xp_systemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * Filter, which xp_system to fetch.
     */
    where: xp_systemWhereUniqueInput
  }

  /**
   * xp_system findFirst
   */
  export type xp_systemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * Filter, which xp_system to fetch.
     */
    where?: xp_systemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xp_systems to fetch.
     */
    orderBy?: xp_systemOrderByWithRelationInput | xp_systemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for xp_systems.
     */
    cursor?: xp_systemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xp_systems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xp_systems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of xp_systems.
     */
    distinct?: Xp_systemScalarFieldEnum | Xp_systemScalarFieldEnum[]
  }

  /**
   * xp_system findFirstOrThrow
   */
  export type xp_systemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * Filter, which xp_system to fetch.
     */
    where?: xp_systemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xp_systems to fetch.
     */
    orderBy?: xp_systemOrderByWithRelationInput | xp_systemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for xp_systems.
     */
    cursor?: xp_systemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xp_systems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xp_systems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of xp_systems.
     */
    distinct?: Xp_systemScalarFieldEnum | Xp_systemScalarFieldEnum[]
  }

  /**
   * xp_system findMany
   */
  export type xp_systemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * Filter, which xp_systems to fetch.
     */
    where?: xp_systemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of xp_systems to fetch.
     */
    orderBy?: xp_systemOrderByWithRelationInput | xp_systemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing xp_systems.
     */
    cursor?: xp_systemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` xp_systems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` xp_systems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of xp_systems.
     */
    distinct?: Xp_systemScalarFieldEnum | Xp_systemScalarFieldEnum[]
  }

  /**
   * xp_system create
   */
  export type xp_systemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * The data needed to create a xp_system.
     */
    data: XOR<xp_systemCreateInput, xp_systemUncheckedCreateInput>
  }

  /**
   * xp_system createMany
   */
  export type xp_systemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many xp_systems.
     */
    data: xp_systemCreateManyInput | xp_systemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * xp_system createManyAndReturn
   */
  export type xp_systemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * The data used to create many xp_systems.
     */
    data: xp_systemCreateManyInput | xp_systemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * xp_system update
   */
  export type xp_systemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * The data needed to update a xp_system.
     */
    data: XOR<xp_systemUpdateInput, xp_systemUncheckedUpdateInput>
    /**
     * Choose, which xp_system to update.
     */
    where: xp_systemWhereUniqueInput
  }

  /**
   * xp_system updateMany
   */
  export type xp_systemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update xp_systems.
     */
    data: XOR<xp_systemUpdateManyMutationInput, xp_systemUncheckedUpdateManyInput>
    /**
     * Filter which xp_systems to update
     */
    where?: xp_systemWhereInput
    /**
     * Limit how many xp_systems to update.
     */
    limit?: number
  }

  /**
   * xp_system updateManyAndReturn
   */
  export type xp_systemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * The data used to update xp_systems.
     */
    data: XOR<xp_systemUpdateManyMutationInput, xp_systemUncheckedUpdateManyInput>
    /**
     * Filter which xp_systems to update
     */
    where?: xp_systemWhereInput
    /**
     * Limit how many xp_systems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * xp_system upsert
   */
  export type xp_systemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * The filter to search for the xp_system to update in case it exists.
     */
    where: xp_systemWhereUniqueInput
    /**
     * In case the xp_system found by the `where` argument doesn't exist, create a new xp_system with this data.
     */
    create: XOR<xp_systemCreateInput, xp_systemUncheckedCreateInput>
    /**
     * In case the xp_system was found with the provided `where` argument, update it with this data.
     */
    update: XOR<xp_systemUpdateInput, xp_systemUncheckedUpdateInput>
  }

  /**
   * xp_system delete
   */
  export type xp_systemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    /**
     * Filter which xp_system to delete.
     */
    where: xp_systemWhereUniqueInput
  }

  /**
   * xp_system deleteMany
   */
  export type xp_systemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which xp_systems to delete
     */
    where?: xp_systemWhereInput
    /**
     * Limit how many xp_systems to delete.
     */
    limit?: number
  }

  /**
   * xp_system without action
   */
  export type xp_systemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    total_xp: number | null
    streak: number | null
    weekly_xp: number | null
  }

  export type UserSumAggregateOutputType = {
    total_xp: number | null
    streak: number | null
    weekly_xp: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    total_xp: number | null
    image: string | null
    emailVerified: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    first_name: string | null
    last_name: string | null
    school: string | null
    major: string | null
    class_status: string | null
    streak: number | null
    weekly_xp: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    total_xp: number | null
    image: string | null
    emailVerified: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    first_name: string | null
    last_name: string | null
    school: string | null
    major: string | null
    class_status: string | null
    streak: number | null
    weekly_xp: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    total_xp: number
    image: number
    emailVerified: number
    createdAt: number
    updatedAt: number
    name: number
    first_name: number
    last_name: number
    school: number
    major: number
    class_status: number
    streak: number
    weekly_xp: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    total_xp?: true
    streak?: true
    weekly_xp?: true
  }

  export type UserSumAggregateInputType = {
    total_xp?: true
    streak?: true
    weekly_xp?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    total_xp?: true
    image?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    first_name?: true
    last_name?: true
    school?: true
    major?: true
    class_status?: true
    streak?: true
    weekly_xp?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    total_xp?: true
    image?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    first_name?: true
    last_name?: true
    school?: true
    major?: true
    class_status?: true
    streak?: true
    weekly_xp?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    total_xp?: true
    image?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    first_name?: true
    last_name?: true
    school?: true
    major?: true
    class_status?: true
    streak?: true
    weekly_xp?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    total_xp: number | null
    image: string | null
    emailVerified: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    first_name: string | null
    last_name: string | null
    school: string | null
    major: string | null
    class_status: string | null
    streak: number | null
    weekly_xp: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    total_xp?: boolean
    image?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    first_name?: boolean
    last_name?: boolean
    school?: boolean
    major?: boolean
    class_status?: boolean
    streak?: boolean
    weekly_xp?: boolean
    Account?: boolean | User$AccountArgs<ExtArgs>
    chat_sessions?: boolean | User$chat_sessionsArgs<ExtArgs>
    daily_topic_metrics?: boolean | User$daily_topic_metricsArgs<ExtArgs>
    friend_requests_friend_requests_receiver_idTousers?: boolean | User$friend_requests_friend_requests_receiver_idTousersArgs<ExtArgs>
    friend_requests_friend_requests_sender_idTousers?: boolean | User$friend_requests_friend_requests_sender_idTousersArgs<ExtArgs>
    friends_friends_friend_idTousers?: boolean | User$friends_friends_friend_idTousersArgs<ExtArgs>
    friends_friends_user_idTousers?: boolean | User$friends_friends_user_idTousersArgs<ExtArgs>
    user_achievements?: boolean | User$user_achievementsArgs<ExtArgs>
    xp_system?: boolean | User$xp_systemArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    total_xp?: boolean
    image?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    first_name?: boolean
    last_name?: boolean
    school?: boolean
    major?: boolean
    class_status?: boolean
    streak?: boolean
    weekly_xp?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    total_xp?: boolean
    image?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    first_name?: boolean
    last_name?: boolean
    school?: boolean
    major?: boolean
    class_status?: boolean
    streak?: boolean
    weekly_xp?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    total_xp?: boolean
    image?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    first_name?: boolean
    last_name?: boolean
    school?: boolean
    major?: boolean
    class_status?: boolean
    streak?: boolean
    weekly_xp?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "total_xp" | "image" | "emailVerified" | "createdAt" | "updatedAt" | "name" | "first_name" | "last_name" | "school" | "major" | "class_status" | "streak" | "weekly_xp", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Account?: boolean | User$AccountArgs<ExtArgs>
    chat_sessions?: boolean | User$chat_sessionsArgs<ExtArgs>
    daily_topic_metrics?: boolean | User$daily_topic_metricsArgs<ExtArgs>
    friend_requests_friend_requests_receiver_idTousers?: boolean | User$friend_requests_friend_requests_receiver_idTousersArgs<ExtArgs>
    friend_requests_friend_requests_sender_idTousers?: boolean | User$friend_requests_friend_requests_sender_idTousersArgs<ExtArgs>
    friends_friends_friend_idTousers?: boolean | User$friends_friends_friend_idTousersArgs<ExtArgs>
    friends_friends_user_idTousers?: boolean | User$friends_friends_user_idTousersArgs<ExtArgs>
    user_achievements?: boolean | User$user_achievementsArgs<ExtArgs>
    xp_system?: boolean | User$xp_systemArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Account: Prisma.$AccountPayload<ExtArgs>[]
      chat_sessions: Prisma.$chat_sessionsPayload<ExtArgs>[]
      daily_topic_metrics: Prisma.$daily_topic_metricsPayload<ExtArgs>[]
      friend_requests_friend_requests_receiver_idTousers: Prisma.$friend_requestsPayload<ExtArgs>[]
      friend_requests_friend_requests_sender_idTousers: Prisma.$friend_requestsPayload<ExtArgs>[]
      friends_friends_friend_idTousers: Prisma.$friendsPayload<ExtArgs>[]
      friends_friends_user_idTousers: Prisma.$friendsPayload<ExtArgs>[]
      user_achievements: Prisma.$user_achievementsPayload<ExtArgs>[]
      xp_system: Prisma.$xp_systemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      total_xp: number | null
      image: string | null
      emailVerified: Date | null
      createdAt: Date | null
      updatedAt: Date | null
      name: string | null
      first_name: string | null
      last_name: string | null
      school: string | null
      major: string | null
      class_status: string | null
      streak: number | null
      weekly_xp: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Account<T extends User$AccountArgs<ExtArgs> = {}>(args?: Subset<T, User$AccountArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chat_sessions<T extends User$chat_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$chat_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chat_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    daily_topic_metrics<T extends User$daily_topic_metricsArgs<ExtArgs> = {}>(args?: Subset<T, User$daily_topic_metricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$daily_topic_metricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friend_requests_friend_requests_receiver_idTousers<T extends User$friend_requests_friend_requests_receiver_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, User$friend_requests_friend_requests_receiver_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friend_requests_friend_requests_sender_idTousers<T extends User$friend_requests_friend_requests_sender_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, User$friend_requests_friend_requests_sender_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friend_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friends_friends_friend_idTousers<T extends User$friends_friends_friend_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, User$friends_friends_friend_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friends_friends_user_idTousers<T extends User$friends_friends_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, User$friends_friends_user_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$friendsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_achievements<T extends User$user_achievementsArgs<ExtArgs> = {}>(args?: Subset<T, User$user_achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_achievementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    xp_system<T extends User$xp_systemArgs<ExtArgs> = {}>(args?: Subset<T, User$xp_systemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$xp_systemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly total_xp: FieldRef<"User", 'Int'>
    readonly image: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly school: FieldRef<"User", 'String'>
    readonly major: FieldRef<"User", 'String'>
    readonly class_status: FieldRef<"User", 'String'>
    readonly streak: FieldRef<"User", 'Int'>
    readonly weekly_xp: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Account
   */
  export type User$AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.chat_sessions
   */
  export type User$chat_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat_sessions
     */
    select?: chat_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat_sessions
     */
    omit?: chat_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chat_sessionsInclude<ExtArgs> | null
    where?: chat_sessionsWhereInput
    orderBy?: chat_sessionsOrderByWithRelationInput | chat_sessionsOrderByWithRelationInput[]
    cursor?: chat_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Chat_sessionsScalarFieldEnum | Chat_sessionsScalarFieldEnum[]
  }

  /**
   * User.daily_topic_metrics
   */
  export type User$daily_topic_metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the daily_topic_metrics
     */
    select?: daily_topic_metricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the daily_topic_metrics
     */
    omit?: daily_topic_metricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: daily_topic_metricsInclude<ExtArgs> | null
    where?: daily_topic_metricsWhereInput
    orderBy?: daily_topic_metricsOrderByWithRelationInput | daily_topic_metricsOrderByWithRelationInput[]
    cursor?: daily_topic_metricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Daily_topic_metricsScalarFieldEnum | Daily_topic_metricsScalarFieldEnum[]
  }

  /**
   * User.friend_requests_friend_requests_receiver_idTousers
   */
  export type User$friend_requests_friend_requests_receiver_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    where?: friend_requestsWhereInput
    orderBy?: friend_requestsOrderByWithRelationInput | friend_requestsOrderByWithRelationInput[]
    cursor?: friend_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Friend_requestsScalarFieldEnum | Friend_requestsScalarFieldEnum[]
  }

  /**
   * User.friend_requests_friend_requests_sender_idTousers
   */
  export type User$friend_requests_friend_requests_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friend_requests
     */
    select?: friend_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friend_requests
     */
    omit?: friend_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friend_requestsInclude<ExtArgs> | null
    where?: friend_requestsWhereInput
    orderBy?: friend_requestsOrderByWithRelationInput | friend_requestsOrderByWithRelationInput[]
    cursor?: friend_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Friend_requestsScalarFieldEnum | Friend_requestsScalarFieldEnum[]
  }

  /**
   * User.friends_friends_friend_idTousers
   */
  export type User$friends_friends_friend_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    where?: friendsWhereInput
    orderBy?: friendsOrderByWithRelationInput | friendsOrderByWithRelationInput[]
    cursor?: friendsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendsScalarFieldEnum | FriendsScalarFieldEnum[]
  }

  /**
   * User.friends_friends_user_idTousers
   */
  export type User$friends_friends_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the friends
     */
    select?: friendsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the friends
     */
    omit?: friendsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: friendsInclude<ExtArgs> | null
    where?: friendsWhereInput
    orderBy?: friendsOrderByWithRelationInput | friendsOrderByWithRelationInput[]
    cursor?: friendsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendsScalarFieldEnum | FriendsScalarFieldEnum[]
  }

  /**
   * User.user_achievements
   */
  export type User$user_achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_achievements
     */
    select?: user_achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_achievements
     */
    omit?: user_achievementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_achievementsInclude<ExtArgs> | null
    where?: user_achievementsWhereInput
    orderBy?: user_achievementsOrderByWithRelationInput | user_achievementsOrderByWithRelationInput[]
    cursor?: user_achievementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_achievementsScalarFieldEnum | User_achievementsScalarFieldEnum[]
  }

  /**
   * User.xp_system
   */
  export type User$xp_systemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the xp_system
     */
    select?: xp_systemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the xp_system
     */
    omit?: xp_systemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: xp_systemInclude<ExtArgs> | null
    where?: xp_systemWhereInput
    orderBy?: xp_systemOrderByWithRelationInput | xp_systemOrderByWithRelationInput[]
    cursor?: xp_systemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Xp_systemScalarFieldEnum | Xp_systemScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: bigint | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    userId: string | null
    provider: string | null
    providerAccountId: string | null
    access_token: string | null
    refresh_token: string | null
    expires_at: bigint | null
    type: string | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
    refresh_token_expires_in: number | null
    updatedat: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    userId: string | null
    provider: string | null
    providerAccountId: string | null
    access_token: string | null
    refresh_token: string | null
    expires_at: bigint | null
    type: string | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
    refresh_token_expires_in: number | null
    updatedat: Date | null
  }

  export type AccountCountAggregateOutputType = {
    userId: number
    provider: number
    providerAccountId: number
    access_token: number
    refresh_token: number
    expires_at: number
    type: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    refresh_token_expires_in: number
    updatedat: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    userId?: true
    provider?: true
    providerAccountId?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    type?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    refresh_token_expires_in?: true
    updatedat?: true
  }

  export type AccountMaxAggregateInputType = {
    userId?: true
    provider?: true
    providerAccountId?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    type?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    refresh_token_expires_in?: true
    updatedat?: true
  }

  export type AccountCountAggregateInputType = {
    userId?: true
    provider?: true
    providerAccountId?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    type?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    refresh_token_expires_in?: true
    updatedat?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    userId: string
    provider: string
    providerAccountId: string
    access_token: string | null
    refresh_token: string | null
    expires_at: bigint | null
    type: string | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
    refresh_token_expires_in: number | null
    updatedat: Date | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    type?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refresh_token_expires_in?: boolean
    updatedat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    type?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refresh_token_expires_in?: boolean
    updatedat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    type?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refresh_token_expires_in?: boolean
    updatedat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    userId?: boolean
    provider?: boolean
    providerAccountId?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    type?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refresh_token_expires_in?: boolean
    updatedat?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "provider" | "providerAccountId" | "access_token" | "refresh_token" | "expires_at" | "type" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt" | "refresh_token_expires_in" | "updatedat", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      provider: string
      providerAccountId: string
      access_token: string | null
      refresh_token: string | null
      expires_at: bigint | null
      type: string | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date | null
      updatedAt: Date | null
      refresh_token_expires_in: number | null
      updatedat: Date | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const accountWithUserIdOnly = await prisma.account.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly userId: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'BigInt'>
    readonly type: FieldRef<"Account", 'String'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
    readonly updatedat: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AchievementsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    xp_reward: 'xp_reward',
    created_at: 'created_at'
  };

  export type AchievementsScalarFieldEnum = (typeof AchievementsScalarFieldEnum)[keyof typeof AchievementsScalarFieldEnum]


  export const Chat_historyScalarFieldEnum: {
    id: 'id',
    session_id: 'session_id',
    sender: 'sender',
    content: 'content',
    created_at: 'created_at'
  };

  export type Chat_historyScalarFieldEnum = (typeof Chat_historyScalarFieldEnum)[keyof typeof Chat_historyScalarFieldEnum]


  export const Chat_sessionsScalarFieldEnum: {
    session_id: 'session_id',
    class_code: 'class_code',
    user_id: 'user_id',
    topic_id: 'topic_id',
    started_at: 'started_at',
    created_at: 'created_at'
  };

  export type Chat_sessionsScalarFieldEnum = (typeof Chat_sessionsScalarFieldEnum)[keyof typeof Chat_sessionsScalarFieldEnum]


  export const ClassesScalarFieldEnum: {
    class_code: 'class_code',
    subject: 'subject',
    name: 'name',
    created_at: 'created_at',
    user_id: 'user_id',
    syllabus_url: 'syllabus_url'
  };

  export type ClassesScalarFieldEnum = (typeof ClassesScalarFieldEnum)[keyof typeof ClassesScalarFieldEnum]


  export const Daily_topic_metricsScalarFieldEnum: {
    user_id: 'user_id',
    class_code: 'class_code',
    topic_id: 'topic_id',
    metric_date: 'metric_date',
    avg_score: 'avg_score'
  };

  export type Daily_topic_metricsScalarFieldEnum = (typeof Daily_topic_metricsScalarFieldEnum)[keyof typeof Daily_topic_metricsScalarFieldEnum]


  export const Friend_requestsScalarFieldEnum: {
    id: 'id',
    sender_id: 'sender_id',
    receiver_id: 'receiver_id',
    status: 'status',
    created_at: 'created_at',
    responded_at: 'responded_at'
  };

  export type Friend_requestsScalarFieldEnum = (typeof Friend_requestsScalarFieldEnum)[keyof typeof Friend_requestsScalarFieldEnum]


  export const FriendsScalarFieldEnum: {
    user_id: 'user_id',
    friend_id: 'friend_id',
    created_at: 'created_at',
    streak: 'streak',
    total_xp: 'total_xp'
  };

  export type FriendsScalarFieldEnum = (typeof FriendsScalarFieldEnum)[keyof typeof FriendsScalarFieldEnum]


  export const TopicsScalarFieldEnum: {
    id: 'id',
    class_code: 'class_code',
    name: 'name'
  };

  export type TopicsScalarFieldEnum = (typeof TopicsScalarFieldEnum)[keyof typeof TopicsScalarFieldEnum]


  export const User_achievementsScalarFieldEnum: {
    user_id: 'user_id',
    achievement_id: 'achievement_id',
    earned_at: 'earned_at'
  };

  export type User_achievementsScalarFieldEnum = (typeof User_achievementsScalarFieldEnum)[keyof typeof User_achievementsScalarFieldEnum]


  export const Xp_systemScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    source: 'source',
    amount: 'amount',
    created_at: 'created_at'
  };

  export type Xp_systemScalarFieldEnum = (typeof Xp_systemScalarFieldEnum)[keyof typeof Xp_systemScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    total_xp: 'total_xp',
    image: 'image',
    emailVerified: 'emailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    first_name: 'first_name',
    last_name: 'last_name',
    school: 'school',
    major: 'major',
    class_status: 'class_status',
    streak: 'streak',
    weekly_xp: 'weekly_xp'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    userId: 'userId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_at: 'expires_at',
    type: 'type',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    refresh_token_expires_in: 'refresh_token_expires_in',
    updatedat: 'updatedat'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type achievementsWhereInput = {
    AND?: achievementsWhereInput | achievementsWhereInput[]
    OR?: achievementsWhereInput[]
    NOT?: achievementsWhereInput | achievementsWhereInput[]
    id?: StringFilter<"achievements"> | string
    name?: StringFilter<"achievements"> | string
    description?: StringNullableFilter<"achievements"> | string | null
    xp_reward?: IntNullableFilter<"achievements"> | number | null
    created_at?: DateTimeNullableFilter<"achievements"> | Date | string | null
    user_achievements?: User_achievementsListRelationFilter
  }

  export type achievementsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    xp_reward?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    user_achievements?: user_achievementsOrderByRelationAggregateInput
  }

  export type achievementsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: achievementsWhereInput | achievementsWhereInput[]
    OR?: achievementsWhereInput[]
    NOT?: achievementsWhereInput | achievementsWhereInput[]
    name?: StringFilter<"achievements"> | string
    description?: StringNullableFilter<"achievements"> | string | null
    xp_reward?: IntNullableFilter<"achievements"> | number | null
    created_at?: DateTimeNullableFilter<"achievements"> | Date | string | null
    user_achievements?: User_achievementsListRelationFilter
  }, "id">

  export type achievementsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    xp_reward?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: achievementsCountOrderByAggregateInput
    _avg?: achievementsAvgOrderByAggregateInput
    _max?: achievementsMaxOrderByAggregateInput
    _min?: achievementsMinOrderByAggregateInput
    _sum?: achievementsSumOrderByAggregateInput
  }

  export type achievementsScalarWhereWithAggregatesInput = {
    AND?: achievementsScalarWhereWithAggregatesInput | achievementsScalarWhereWithAggregatesInput[]
    OR?: achievementsScalarWhereWithAggregatesInput[]
    NOT?: achievementsScalarWhereWithAggregatesInput | achievementsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"achievements"> | string
    name?: StringWithAggregatesFilter<"achievements"> | string
    description?: StringNullableWithAggregatesFilter<"achievements"> | string | null
    xp_reward?: IntNullableWithAggregatesFilter<"achievements"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"achievements"> | Date | string | null
  }

  export type chat_historyWhereInput = {
    AND?: chat_historyWhereInput | chat_historyWhereInput[]
    OR?: chat_historyWhereInput[]
    NOT?: chat_historyWhereInput | chat_historyWhereInput[]
    id?: StringFilter<"chat_history"> | string
    session_id?: StringFilter<"chat_history"> | string
    sender?: StringFilter<"chat_history"> | string
    content?: StringFilter<"chat_history"> | string
    created_at?: DateTimeNullableFilter<"chat_history"> | Date | string | null
    chat_sessions?: XOR<Chat_sessionsScalarRelationFilter, chat_sessionsWhereInput>
  }

  export type chat_historyOrderByWithRelationInput = {
    id?: SortOrder
    session_id?: SortOrder
    sender?: SortOrder
    content?: SortOrder
    created_at?: SortOrderInput | SortOrder
    chat_sessions?: chat_sessionsOrderByWithRelationInput
  }

  export type chat_historyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: chat_historyWhereInput | chat_historyWhereInput[]
    OR?: chat_historyWhereInput[]
    NOT?: chat_historyWhereInput | chat_historyWhereInput[]
    session_id?: StringFilter<"chat_history"> | string
    sender?: StringFilter<"chat_history"> | string
    content?: StringFilter<"chat_history"> | string
    created_at?: DateTimeNullableFilter<"chat_history"> | Date | string | null
    chat_sessions?: XOR<Chat_sessionsScalarRelationFilter, chat_sessionsWhereInput>
  }, "id">

  export type chat_historyOrderByWithAggregationInput = {
    id?: SortOrder
    session_id?: SortOrder
    sender?: SortOrder
    content?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: chat_historyCountOrderByAggregateInput
    _max?: chat_historyMaxOrderByAggregateInput
    _min?: chat_historyMinOrderByAggregateInput
  }

  export type chat_historyScalarWhereWithAggregatesInput = {
    AND?: chat_historyScalarWhereWithAggregatesInput | chat_historyScalarWhereWithAggregatesInput[]
    OR?: chat_historyScalarWhereWithAggregatesInput[]
    NOT?: chat_historyScalarWhereWithAggregatesInput | chat_historyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"chat_history"> | string
    session_id?: StringWithAggregatesFilter<"chat_history"> | string
    sender?: StringWithAggregatesFilter<"chat_history"> | string
    content?: StringWithAggregatesFilter<"chat_history"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"chat_history"> | Date | string | null
  }

  export type chat_sessionsWhereInput = {
    AND?: chat_sessionsWhereInput | chat_sessionsWhereInput[]
    OR?: chat_sessionsWhereInput[]
    NOT?: chat_sessionsWhereInput | chat_sessionsWhereInput[]
    session_id?: StringFilter<"chat_sessions"> | string
    class_code?: StringFilter<"chat_sessions"> | string
    user_id?: StringFilter<"chat_sessions"> | string
    topic_id?: StringFilter<"chat_sessions"> | string
    started_at?: DateTimeNullableFilter<"chat_sessions"> | Date | string | null
    created_at?: DateTimeNullableFilter<"chat_sessions"> | Date | string | null
    chat_history?: Chat_historyListRelationFilter
    classes?: XOR<ClassesScalarRelationFilter, classesWhereInput>
    topics?: XOR<TopicsScalarRelationFilter, topicsWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type chat_sessionsOrderByWithRelationInput = {
    session_id?: SortOrder
    class_code?: SortOrder
    user_id?: SortOrder
    topic_id?: SortOrder
    started_at?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    chat_history?: chat_historyOrderByRelationAggregateInput
    classes?: classesOrderByWithRelationInput
    topics?: topicsOrderByWithRelationInput
    users?: UserOrderByWithRelationInput
  }

  export type chat_sessionsWhereUniqueInput = Prisma.AtLeast<{
    session_id?: string
    AND?: chat_sessionsWhereInput | chat_sessionsWhereInput[]
    OR?: chat_sessionsWhereInput[]
    NOT?: chat_sessionsWhereInput | chat_sessionsWhereInput[]
    class_code?: StringFilter<"chat_sessions"> | string
    user_id?: StringFilter<"chat_sessions"> | string
    topic_id?: StringFilter<"chat_sessions"> | string
    started_at?: DateTimeNullableFilter<"chat_sessions"> | Date | string | null
    created_at?: DateTimeNullableFilter<"chat_sessions"> | Date | string | null
    chat_history?: Chat_historyListRelationFilter
    classes?: XOR<ClassesScalarRelationFilter, classesWhereInput>
    topics?: XOR<TopicsScalarRelationFilter, topicsWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "session_id">

  export type chat_sessionsOrderByWithAggregationInput = {
    session_id?: SortOrder
    class_code?: SortOrder
    user_id?: SortOrder
    topic_id?: SortOrder
    started_at?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: chat_sessionsCountOrderByAggregateInput
    _max?: chat_sessionsMaxOrderByAggregateInput
    _min?: chat_sessionsMinOrderByAggregateInput
  }

  export type chat_sessionsScalarWhereWithAggregatesInput = {
    AND?: chat_sessionsScalarWhereWithAggregatesInput | chat_sessionsScalarWhereWithAggregatesInput[]
    OR?: chat_sessionsScalarWhereWithAggregatesInput[]
    NOT?: chat_sessionsScalarWhereWithAggregatesInput | chat_sessionsScalarWhereWithAggregatesInput[]
    session_id?: StringWithAggregatesFilter<"chat_sessions"> | string
    class_code?: StringWithAggregatesFilter<"chat_sessions"> | string
    user_id?: StringWithAggregatesFilter<"chat_sessions"> | string
    topic_id?: StringWithAggregatesFilter<"chat_sessions"> | string
    started_at?: DateTimeNullableWithAggregatesFilter<"chat_sessions"> | Date | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"chat_sessions"> | Date | string | null
  }

  export type classesWhereInput = {
    AND?: classesWhereInput | classesWhereInput[]
    OR?: classesWhereInput[]
    NOT?: classesWhereInput | classesWhereInput[]
    class_code?: StringFilter<"classes"> | string
    subject?: StringFilter<"classes"> | string
    name?: StringFilter<"classes"> | string
    created_at?: DateTimeNullableFilter<"classes"> | Date | string | null
    user_id?: StringNullableFilter<"classes"> | string | null
    syllabus_url?: StringNullableFilter<"classes"> | string | null
    chat_sessions?: Chat_sessionsListRelationFilter
    daily_topic_metrics?: Daily_topic_metricsListRelationFilter
    topics?: TopicsListRelationFilter
  }

  export type classesOrderByWithRelationInput = {
    class_code?: SortOrder
    subject?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    syllabus_url?: SortOrderInput | SortOrder
    chat_sessions?: chat_sessionsOrderByRelationAggregateInput
    daily_topic_metrics?: daily_topic_metricsOrderByRelationAggregateInput
    topics?: topicsOrderByRelationAggregateInput
  }

  export type classesWhereUniqueInput = Prisma.AtLeast<{
    class_code?: string
    AND?: classesWhereInput | classesWhereInput[]
    OR?: classesWhereInput[]
    NOT?: classesWhereInput | classesWhereInput[]
    subject?: StringFilter<"classes"> | string
    name?: StringFilter<"classes"> | string
    created_at?: DateTimeNullableFilter<"classes"> | Date | string | null
    user_id?: StringNullableFilter<"classes"> | string | null
    syllabus_url?: StringNullableFilter<"classes"> | string | null
    chat_sessions?: Chat_sessionsListRelationFilter
    daily_topic_metrics?: Daily_topic_metricsListRelationFilter
    topics?: TopicsListRelationFilter
  }, "class_code">

  export type classesOrderByWithAggregationInput = {
    class_code?: SortOrder
    subject?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    syllabus_url?: SortOrderInput | SortOrder
    _count?: classesCountOrderByAggregateInput
    _max?: classesMaxOrderByAggregateInput
    _min?: classesMinOrderByAggregateInput
  }

  export type classesScalarWhereWithAggregatesInput = {
    AND?: classesScalarWhereWithAggregatesInput | classesScalarWhereWithAggregatesInput[]
    OR?: classesScalarWhereWithAggregatesInput[]
    NOT?: classesScalarWhereWithAggregatesInput | classesScalarWhereWithAggregatesInput[]
    class_code?: StringWithAggregatesFilter<"classes"> | string
    subject?: StringWithAggregatesFilter<"classes"> | string
    name?: StringWithAggregatesFilter<"classes"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"classes"> | Date | string | null
    user_id?: StringNullableWithAggregatesFilter<"classes"> | string | null
    syllabus_url?: StringNullableWithAggregatesFilter<"classes"> | string | null
  }

  export type daily_topic_metricsWhereInput = {
    AND?: daily_topic_metricsWhereInput | daily_topic_metricsWhereInput[]
    OR?: daily_topic_metricsWhereInput[]
    NOT?: daily_topic_metricsWhereInput | daily_topic_metricsWhereInput[]
    user_id?: StringFilter<"daily_topic_metrics"> | string
    class_code?: StringFilter<"daily_topic_metrics"> | string
    topic_id?: StringFilter<"daily_topic_metrics"> | string
    metric_date?: DateTimeFilter<"daily_topic_metrics"> | Date | string
    avg_score?: DecimalNullableFilter<"daily_topic_metrics"> | Decimal | DecimalJsLike | number | string | null
    classes?: XOR<ClassesScalarRelationFilter, classesWhereInput>
    topics?: XOR<TopicsScalarRelationFilter, topicsWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type daily_topic_metricsOrderByWithRelationInput = {
    user_id?: SortOrder
    class_code?: SortOrder
    topic_id?: SortOrder
    metric_date?: SortOrder
    avg_score?: SortOrderInput | SortOrder
    classes?: classesOrderByWithRelationInput
    topics?: topicsOrderByWithRelationInput
    users?: UserOrderByWithRelationInput
  }

  export type daily_topic_metricsWhereUniqueInput = Prisma.AtLeast<{
    user_id_class_code_topic_id_metric_date?: daily_topic_metricsUser_idClass_codeTopic_idMetric_dateCompoundUniqueInput
    AND?: daily_topic_metricsWhereInput | daily_topic_metricsWhereInput[]
    OR?: daily_topic_metricsWhereInput[]
    NOT?: daily_topic_metricsWhereInput | daily_topic_metricsWhereInput[]
    user_id?: StringFilter<"daily_topic_metrics"> | string
    class_code?: StringFilter<"daily_topic_metrics"> | string
    topic_id?: StringFilter<"daily_topic_metrics"> | string
    metric_date?: DateTimeFilter<"daily_topic_metrics"> | Date | string
    avg_score?: DecimalNullableFilter<"daily_topic_metrics"> | Decimal | DecimalJsLike | number | string | null
    classes?: XOR<ClassesScalarRelationFilter, classesWhereInput>
    topics?: XOR<TopicsScalarRelationFilter, topicsWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id_class_code_topic_id_metric_date">

  export type daily_topic_metricsOrderByWithAggregationInput = {
    user_id?: SortOrder
    class_code?: SortOrder
    topic_id?: SortOrder
    metric_date?: SortOrder
    avg_score?: SortOrderInput | SortOrder
    _count?: daily_topic_metricsCountOrderByAggregateInput
    _avg?: daily_topic_metricsAvgOrderByAggregateInput
    _max?: daily_topic_metricsMaxOrderByAggregateInput
    _min?: daily_topic_metricsMinOrderByAggregateInput
    _sum?: daily_topic_metricsSumOrderByAggregateInput
  }

  export type daily_topic_metricsScalarWhereWithAggregatesInput = {
    AND?: daily_topic_metricsScalarWhereWithAggregatesInput | daily_topic_metricsScalarWhereWithAggregatesInput[]
    OR?: daily_topic_metricsScalarWhereWithAggregatesInput[]
    NOT?: daily_topic_metricsScalarWhereWithAggregatesInput | daily_topic_metricsScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"daily_topic_metrics"> | string
    class_code?: StringWithAggregatesFilter<"daily_topic_metrics"> | string
    topic_id?: StringWithAggregatesFilter<"daily_topic_metrics"> | string
    metric_date?: DateTimeWithAggregatesFilter<"daily_topic_metrics"> | Date | string
    avg_score?: DecimalNullableWithAggregatesFilter<"daily_topic_metrics"> | Decimal | DecimalJsLike | number | string | null
  }

  export type friend_requestsWhereInput = {
    AND?: friend_requestsWhereInput | friend_requestsWhereInput[]
    OR?: friend_requestsWhereInput[]
    NOT?: friend_requestsWhereInput | friend_requestsWhereInput[]
    id?: StringFilter<"friend_requests"> | string
    sender_id?: StringFilter<"friend_requests"> | string
    receiver_id?: StringFilter<"friend_requests"> | string
    status?: StringFilter<"friend_requests"> | string
    created_at?: DateTimeNullableFilter<"friend_requests"> | Date | string | null
    responded_at?: DateTimeNullableFilter<"friend_requests"> | Date | string | null
    users_friend_requests_receiver_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
    users_friend_requests_sender_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type friend_requestsOrderByWithRelationInput = {
    id?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrderInput | SortOrder
    responded_at?: SortOrderInput | SortOrder
    users_friend_requests_receiver_idTousers?: UserOrderByWithRelationInput
    users_friend_requests_sender_idTousers?: UserOrderByWithRelationInput
  }

  export type friend_requestsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: friend_requestsWhereInput | friend_requestsWhereInput[]
    OR?: friend_requestsWhereInput[]
    NOT?: friend_requestsWhereInput | friend_requestsWhereInput[]
    sender_id?: StringFilter<"friend_requests"> | string
    receiver_id?: StringFilter<"friend_requests"> | string
    status?: StringFilter<"friend_requests"> | string
    created_at?: DateTimeNullableFilter<"friend_requests"> | Date | string | null
    responded_at?: DateTimeNullableFilter<"friend_requests"> | Date | string | null
    users_friend_requests_receiver_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
    users_friend_requests_sender_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type friend_requestsOrderByWithAggregationInput = {
    id?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrderInput | SortOrder
    responded_at?: SortOrderInput | SortOrder
    _count?: friend_requestsCountOrderByAggregateInput
    _max?: friend_requestsMaxOrderByAggregateInput
    _min?: friend_requestsMinOrderByAggregateInput
  }

  export type friend_requestsScalarWhereWithAggregatesInput = {
    AND?: friend_requestsScalarWhereWithAggregatesInput | friend_requestsScalarWhereWithAggregatesInput[]
    OR?: friend_requestsScalarWhereWithAggregatesInput[]
    NOT?: friend_requestsScalarWhereWithAggregatesInput | friend_requestsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"friend_requests"> | string
    sender_id?: StringWithAggregatesFilter<"friend_requests"> | string
    receiver_id?: StringWithAggregatesFilter<"friend_requests"> | string
    status?: StringWithAggregatesFilter<"friend_requests"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"friend_requests"> | Date | string | null
    responded_at?: DateTimeNullableWithAggregatesFilter<"friend_requests"> | Date | string | null
  }

  export type friendsWhereInput = {
    AND?: friendsWhereInput | friendsWhereInput[]
    OR?: friendsWhereInput[]
    NOT?: friendsWhereInput | friendsWhereInput[]
    user_id?: StringFilter<"friends"> | string
    friend_id?: StringFilter<"friends"> | string
    created_at?: DateTimeNullableFilter<"friends"> | Date | string | null
    streak?: IntNullableFilter<"friends"> | number | null
    total_xp?: IntNullableFilter<"friends"> | number | null
    users_friends_friend_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
    users_friends_user_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type friendsOrderByWithRelationInput = {
    user_id?: SortOrder
    friend_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    streak?: SortOrderInput | SortOrder
    total_xp?: SortOrderInput | SortOrder
    users_friends_friend_idTousers?: UserOrderByWithRelationInput
    users_friends_user_idTousers?: UserOrderByWithRelationInput
  }

  export type friendsWhereUniqueInput = Prisma.AtLeast<{
    user_id_friend_id?: friendsUser_idFriend_idCompoundUniqueInput
    AND?: friendsWhereInput | friendsWhereInput[]
    OR?: friendsWhereInput[]
    NOT?: friendsWhereInput | friendsWhereInput[]
    user_id?: StringFilter<"friends"> | string
    friend_id?: StringFilter<"friends"> | string
    created_at?: DateTimeNullableFilter<"friends"> | Date | string | null
    streak?: IntNullableFilter<"friends"> | number | null
    total_xp?: IntNullableFilter<"friends"> | number | null
    users_friends_friend_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
    users_friends_user_idTousers?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id_friend_id">

  export type friendsOrderByWithAggregationInput = {
    user_id?: SortOrder
    friend_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    streak?: SortOrderInput | SortOrder
    total_xp?: SortOrderInput | SortOrder
    _count?: friendsCountOrderByAggregateInput
    _avg?: friendsAvgOrderByAggregateInput
    _max?: friendsMaxOrderByAggregateInput
    _min?: friendsMinOrderByAggregateInput
    _sum?: friendsSumOrderByAggregateInput
  }

  export type friendsScalarWhereWithAggregatesInput = {
    AND?: friendsScalarWhereWithAggregatesInput | friendsScalarWhereWithAggregatesInput[]
    OR?: friendsScalarWhereWithAggregatesInput[]
    NOT?: friendsScalarWhereWithAggregatesInput | friendsScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"friends"> | string
    friend_id?: StringWithAggregatesFilter<"friends"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"friends"> | Date | string | null
    streak?: IntNullableWithAggregatesFilter<"friends"> | number | null
    total_xp?: IntNullableWithAggregatesFilter<"friends"> | number | null
  }

  export type topicsWhereInput = {
    AND?: topicsWhereInput | topicsWhereInput[]
    OR?: topicsWhereInput[]
    NOT?: topicsWhereInput | topicsWhereInput[]
    id?: StringFilter<"topics"> | string
    class_code?: StringFilter<"topics"> | string
    name?: StringFilter<"topics"> | string
    chat_sessions?: Chat_sessionsListRelationFilter
    daily_topic_metrics?: Daily_topic_metricsListRelationFilter
    classes?: XOR<ClassesScalarRelationFilter, classesWhereInput>
  }

  export type topicsOrderByWithRelationInput = {
    id?: SortOrder
    class_code?: SortOrder
    name?: SortOrder
    chat_sessions?: chat_sessionsOrderByRelationAggregateInput
    daily_topic_metrics?: daily_topic_metricsOrderByRelationAggregateInput
    classes?: classesOrderByWithRelationInput
  }

  export type topicsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: topicsWhereInput | topicsWhereInput[]
    OR?: topicsWhereInput[]
    NOT?: topicsWhereInput | topicsWhereInput[]
    class_code?: StringFilter<"topics"> | string
    name?: StringFilter<"topics"> | string
    chat_sessions?: Chat_sessionsListRelationFilter
    daily_topic_metrics?: Daily_topic_metricsListRelationFilter
    classes?: XOR<ClassesScalarRelationFilter, classesWhereInput>
  }, "id">

  export type topicsOrderByWithAggregationInput = {
    id?: SortOrder
    class_code?: SortOrder
    name?: SortOrder
    _count?: topicsCountOrderByAggregateInput
    _max?: topicsMaxOrderByAggregateInput
    _min?: topicsMinOrderByAggregateInput
  }

  export type topicsScalarWhereWithAggregatesInput = {
    AND?: topicsScalarWhereWithAggregatesInput | topicsScalarWhereWithAggregatesInput[]
    OR?: topicsScalarWhereWithAggregatesInput[]
    NOT?: topicsScalarWhereWithAggregatesInput | topicsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"topics"> | string
    class_code?: StringWithAggregatesFilter<"topics"> | string
    name?: StringWithAggregatesFilter<"topics"> | string
  }

  export type user_achievementsWhereInput = {
    AND?: user_achievementsWhereInput | user_achievementsWhereInput[]
    OR?: user_achievementsWhereInput[]
    NOT?: user_achievementsWhereInput | user_achievementsWhereInput[]
    user_id?: StringFilter<"user_achievements"> | string
    achievement_id?: StringFilter<"user_achievements"> | string
    earned_at?: DateTimeNullableFilter<"user_achievements"> | Date | string | null
    achievements?: XOR<AchievementsScalarRelationFilter, achievementsWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type user_achievementsOrderByWithRelationInput = {
    user_id?: SortOrder
    achievement_id?: SortOrder
    earned_at?: SortOrderInput | SortOrder
    achievements?: achievementsOrderByWithRelationInput
    users?: UserOrderByWithRelationInput
  }

  export type user_achievementsWhereUniqueInput = Prisma.AtLeast<{
    user_id_achievement_id?: user_achievementsUser_idAchievement_idCompoundUniqueInput
    AND?: user_achievementsWhereInput | user_achievementsWhereInput[]
    OR?: user_achievementsWhereInput[]
    NOT?: user_achievementsWhereInput | user_achievementsWhereInput[]
    user_id?: StringFilter<"user_achievements"> | string
    achievement_id?: StringFilter<"user_achievements"> | string
    earned_at?: DateTimeNullableFilter<"user_achievements"> | Date | string | null
    achievements?: XOR<AchievementsScalarRelationFilter, achievementsWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id_achievement_id">

  export type user_achievementsOrderByWithAggregationInput = {
    user_id?: SortOrder
    achievement_id?: SortOrder
    earned_at?: SortOrderInput | SortOrder
    _count?: user_achievementsCountOrderByAggregateInput
    _max?: user_achievementsMaxOrderByAggregateInput
    _min?: user_achievementsMinOrderByAggregateInput
  }

  export type user_achievementsScalarWhereWithAggregatesInput = {
    AND?: user_achievementsScalarWhereWithAggregatesInput | user_achievementsScalarWhereWithAggregatesInput[]
    OR?: user_achievementsScalarWhereWithAggregatesInput[]
    NOT?: user_achievementsScalarWhereWithAggregatesInput | user_achievementsScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"user_achievements"> | string
    achievement_id?: StringWithAggregatesFilter<"user_achievements"> | string
    earned_at?: DateTimeNullableWithAggregatesFilter<"user_achievements"> | Date | string | null
  }

  export type xp_systemWhereInput = {
    AND?: xp_systemWhereInput | xp_systemWhereInput[]
    OR?: xp_systemWhereInput[]
    NOT?: xp_systemWhereInput | xp_systemWhereInput[]
    id?: StringFilter<"xp_system"> | string
    user_id?: StringFilter<"xp_system"> | string
    source?: StringFilter<"xp_system"> | string
    amount?: IntFilter<"xp_system"> | number
    created_at?: DateTimeNullableFilter<"xp_system"> | Date | string | null
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type xp_systemOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    source?: SortOrder
    amount?: SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: UserOrderByWithRelationInput
  }

  export type xp_systemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: xp_systemWhereInput | xp_systemWhereInput[]
    OR?: xp_systemWhereInput[]
    NOT?: xp_systemWhereInput | xp_systemWhereInput[]
    user_id?: StringFilter<"xp_system"> | string
    source?: StringFilter<"xp_system"> | string
    amount?: IntFilter<"xp_system"> | number
    created_at?: DateTimeNullableFilter<"xp_system"> | Date | string | null
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type xp_systemOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    source?: SortOrder
    amount?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: xp_systemCountOrderByAggregateInput
    _avg?: xp_systemAvgOrderByAggregateInput
    _max?: xp_systemMaxOrderByAggregateInput
    _min?: xp_systemMinOrderByAggregateInput
    _sum?: xp_systemSumOrderByAggregateInput
  }

  export type xp_systemScalarWhereWithAggregatesInput = {
    AND?: xp_systemScalarWhereWithAggregatesInput | xp_systemScalarWhereWithAggregatesInput[]
    OR?: xp_systemScalarWhereWithAggregatesInput[]
    NOT?: xp_systemScalarWhereWithAggregatesInput | xp_systemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"xp_system"> | string
    user_id?: StringWithAggregatesFilter<"xp_system"> | string
    source?: StringWithAggregatesFilter<"xp_system"> | string
    amount?: IntWithAggregatesFilter<"xp_system"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"xp_system"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    total_xp?: IntNullableFilter<"User"> | number | null
    image?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    school?: StringNullableFilter<"User"> | string | null
    major?: StringNullableFilter<"User"> | string | null
    class_status?: StringNullableFilter<"User"> | string | null
    streak?: IntNullableFilter<"User"> | number | null
    weekly_xp?: IntNullableFilter<"User"> | number | null
    Account?: AccountListRelationFilter
    chat_sessions?: Chat_sessionsListRelationFilter
    daily_topic_metrics?: Daily_topic_metricsListRelationFilter
    friend_requests_friend_requests_receiver_idTousers?: Friend_requestsListRelationFilter
    friend_requests_friend_requests_sender_idTousers?: Friend_requestsListRelationFilter
    friends_friends_friend_idTousers?: FriendsListRelationFilter
    friends_friends_user_idTousers?: FriendsListRelationFilter
    user_achievements?: User_achievementsListRelationFilter
    xp_system?: Xp_systemListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    total_xp?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    class_status?: SortOrderInput | SortOrder
    streak?: SortOrderInput | SortOrder
    weekly_xp?: SortOrderInput | SortOrder
    Account?: AccountOrderByRelationAggregateInput
    chat_sessions?: chat_sessionsOrderByRelationAggregateInput
    daily_topic_metrics?: daily_topic_metricsOrderByRelationAggregateInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsOrderByRelationAggregateInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsOrderByRelationAggregateInput
    friends_friends_friend_idTousers?: friendsOrderByRelationAggregateInput
    friends_friends_user_idTousers?: friendsOrderByRelationAggregateInput
    user_achievements?: user_achievementsOrderByRelationAggregateInput
    xp_system?: xp_systemOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    total_xp?: IntNullableFilter<"User"> | number | null
    image?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    school?: StringNullableFilter<"User"> | string | null
    major?: StringNullableFilter<"User"> | string | null
    class_status?: StringNullableFilter<"User"> | string | null
    streak?: IntNullableFilter<"User"> | number | null
    weekly_xp?: IntNullableFilter<"User"> | number | null
    Account?: AccountListRelationFilter
    chat_sessions?: Chat_sessionsListRelationFilter
    daily_topic_metrics?: Daily_topic_metricsListRelationFilter
    friend_requests_friend_requests_receiver_idTousers?: Friend_requestsListRelationFilter
    friend_requests_friend_requests_sender_idTousers?: Friend_requestsListRelationFilter
    friends_friends_friend_idTousers?: FriendsListRelationFilter
    friends_friends_user_idTousers?: FriendsListRelationFilter
    user_achievements?: User_achievementsListRelationFilter
    xp_system?: Xp_systemListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    total_xp?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    major?: SortOrderInput | SortOrder
    class_status?: SortOrderInput | SortOrder
    streak?: SortOrderInput | SortOrder
    weekly_xp?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    total_xp?: IntNullableWithAggregatesFilter<"User"> | number | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    first_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    school?: StringNullableWithAggregatesFilter<"User"> | string | null
    major?: StringNullableWithAggregatesFilter<"User"> | string | null
    class_status?: StringNullableWithAggregatesFilter<"User"> | string | null
    streak?: IntNullableWithAggregatesFilter<"User"> | number | null
    weekly_xp?: IntNullableWithAggregatesFilter<"User"> | number | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    access_token?: StringNullableFilter<"Account"> | string | null
    refresh_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: BigIntNullableFilter<"Account"> | bigint | number | null
    type?: StringNullableFilter<"Account"> | string | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    updatedat?: DateTimeNullableFilter<"Account"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrderInput | SortOrder
    refresh_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    updatedat?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    access_token?: StringNullableFilter<"Account"> | string | null
    refresh_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: BigIntNullableFilter<"Account"> | bigint | number | null
    type?: StringNullableFilter<"Account"> | string | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    updatedat?: DateTimeNullableFilter<"Account"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrderInput | SortOrder
    refresh_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    updatedat?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: BigIntNullableWithAggregatesFilter<"Account"> | bigint | number | null
    type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
    updatedat?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
  }

  export type achievementsCreateInput = {
    id: string
    name: string
    description?: string | null
    xp_reward?: number | null
    created_at?: Date | string | null
    user_achievements?: user_achievementsCreateNestedManyWithoutAchievementsInput
  }

  export type achievementsUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    xp_reward?: number | null
    created_at?: Date | string | null
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutAchievementsInput
  }

  export type achievementsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_reward?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_achievements?: user_achievementsUpdateManyWithoutAchievementsNestedInput
  }

  export type achievementsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_reward?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutAchievementsNestedInput
  }

  export type achievementsCreateManyInput = {
    id: string
    name: string
    description?: string | null
    xp_reward?: number | null
    created_at?: Date | string | null
  }

  export type achievementsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_reward?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type achievementsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_reward?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyCreateInput = {
    id: string
    sender: string
    content: string
    created_at?: Date | string | null
    chat_sessions: chat_sessionsCreateNestedOneWithoutChat_historyInput
  }

  export type chat_historyUncheckedCreateInput = {
    id: string
    session_id: string
    sender: string
    content: string
    created_at?: Date | string | null
  }

  export type chat_historyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_sessions?: chat_sessionsUpdateOneRequiredWithoutChat_historyNestedInput
  }

  export type chat_historyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyCreateManyInput = {
    id: string
    session_id: string
    sender: string
    content: string
    created_at?: Date | string | null
  }

  export type chat_historyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_sessionsCreateInput = {
    session_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyCreateNestedManyWithoutChat_sessionsInput
    classes: classesCreateNestedOneWithoutChat_sessionsInput
    topics: topicsCreateNestedOneWithoutChat_sessionsInput
    users: UserCreateNestedOneWithoutChat_sessionsInput
  }

  export type chat_sessionsUncheckedCreateInput = {
    session_id: string
    class_code: string
    user_id: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyUncheckedCreateNestedManyWithoutChat_sessionsInput
  }

  export type chat_sessionsUpdateInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUpdateManyWithoutChat_sessionsNestedInput
    classes?: classesUpdateOneRequiredWithoutChat_sessionsNestedInput
    topics?: topicsUpdateOneRequiredWithoutChat_sessionsNestedInput
    users?: UserUpdateOneRequiredWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUncheckedUpdateManyWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsCreateManyInput = {
    session_id: string
    class_code: string
    user_id: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
  }

  export type chat_sessionsUpdateManyMutationInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_sessionsUncheckedUpdateManyInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type classesCreateInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    chat_sessions?: chat_sessionsCreateNestedManyWithoutClassesInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutClassesInput
    topics?: topicsCreateNestedManyWithoutClassesInput
  }

  export type classesUncheckedCreateInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutClassesInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutClassesInput
    topics?: topicsUncheckedCreateNestedManyWithoutClassesInput
  }

  export type classesUpdateInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    chat_sessions?: chat_sessionsUpdateManyWithoutClassesNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutClassesNestedInput
    topics?: topicsUpdateManyWithoutClassesNestedInput
  }

  export type classesUncheckedUpdateInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutClassesNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutClassesNestedInput
    topics?: topicsUncheckedUpdateManyWithoutClassesNestedInput
  }

  export type classesCreateManyInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
  }

  export type classesUpdateManyMutationInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type classesUncheckedUpdateManyInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type daily_topic_metricsCreateInput = {
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
    classes: classesCreateNestedOneWithoutDaily_topic_metricsInput
    topics: topicsCreateNestedOneWithoutDaily_topic_metricsInput
    users: UserCreateNestedOneWithoutDaily_topic_metricsInput
  }

  export type daily_topic_metricsUncheckedCreateInput = {
    user_id: string
    class_code: string
    topic_id: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUpdateInput = {
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    classes?: classesUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
    topics?: topicsUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
    users?: UserUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
  }

  export type daily_topic_metricsUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsCreateManyInput = {
    user_id: string
    class_code: string
    topic_id: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUpdateManyMutationInput = {
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type friend_requestsCreateInput = {
    id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
    users_friend_requests_receiver_idTousers: UserCreateNestedOneWithoutFriend_requests_friend_requests_receiver_idTousersInput
    users_friend_requests_sender_idTousers: UserCreateNestedOneWithoutFriend_requests_friend_requests_sender_idTousersInput
  }

  export type friend_requestsUncheckedCreateInput = {
    id: string
    sender_id: string
    receiver_id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
  }

  export type friend_requestsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_friend_requests_receiver_idTousers?: UserUpdateOneRequiredWithoutFriend_requests_friend_requests_receiver_idTousersNestedInput
    users_friend_requests_sender_idTousers?: UserUpdateOneRequiredWithoutFriend_requests_friend_requests_sender_idTousersNestedInput
  }

  export type friend_requestsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender_id?: StringFieldUpdateOperationsInput | string
    receiver_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friend_requestsCreateManyInput = {
    id: string
    sender_id: string
    receiver_id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
  }

  export type friend_requestsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friend_requestsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender_id?: StringFieldUpdateOperationsInput | string
    receiver_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friendsCreateInput = {
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
    users_friends_friend_idTousers: UserCreateNestedOneWithoutFriends_friends_friend_idTousersInput
    users_friends_user_idTousers: UserCreateNestedOneWithoutFriends_friends_user_idTousersInput
  }

  export type friendsUncheckedCreateInput = {
    user_id: string
    friend_id: string
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
  }

  export type friendsUpdateInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    users_friends_friend_idTousers?: UserUpdateOneRequiredWithoutFriends_friends_friend_idTousersNestedInput
    users_friends_user_idTousers?: UserUpdateOneRequiredWithoutFriends_friends_user_idTousersNestedInput
  }

  export type friendsUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    friend_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type friendsCreateManyInput = {
    user_id: string
    friend_id: string
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
  }

  export type friendsUpdateManyMutationInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type friendsUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    friend_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type topicsCreateInput = {
    id: string
    name: string
    chat_sessions?: chat_sessionsCreateNestedManyWithoutTopicsInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutTopicsInput
    classes: classesCreateNestedOneWithoutTopicsInput
  }

  export type topicsUncheckedCreateInput = {
    id: string
    class_code: string
    name: string
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutTopicsInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutTopicsInput
  }

  export type topicsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chat_sessions?: chat_sessionsUpdateManyWithoutTopicsNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutTopicsNestedInput
    classes?: classesUpdateOneRequiredWithoutTopicsNestedInput
  }

  export type topicsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutTopicsNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutTopicsNestedInput
  }

  export type topicsCreateManyInput = {
    id: string
    class_code: string
    name: string
  }

  export type topicsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type topicsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type user_achievementsCreateInput = {
    earned_at?: Date | string | null
    achievements: achievementsCreateNestedOneWithoutUser_achievementsInput
    users: UserCreateNestedOneWithoutUser_achievementsInput
  }

  export type user_achievementsUncheckedCreateInput = {
    user_id: string
    achievement_id: string
    earned_at?: Date | string | null
  }

  export type user_achievementsUpdateInput = {
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievements?: achievementsUpdateOneRequiredWithoutUser_achievementsNestedInput
    users?: UserUpdateOneRequiredWithoutUser_achievementsNestedInput
  }

  export type user_achievementsUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    achievement_id?: StringFieldUpdateOperationsInput | string
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_achievementsCreateManyInput = {
    user_id: string
    achievement_id: string
    earned_at?: Date | string | null
  }

  export type user_achievementsUpdateManyMutationInput = {
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_achievementsUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    achievement_id?: StringFieldUpdateOperationsInput | string
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type xp_systemCreateInput = {
    id: string
    source: string
    amount: number
    created_at?: Date | string | null
    users: UserCreateNestedOneWithoutXp_systemInput
  }

  export type xp_systemUncheckedCreateInput = {
    id: string
    user_id: string
    source: string
    amount: number
    created_at?: Date | string | null
  }

  export type xp_systemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateOneRequiredWithoutXp_systemNestedInput
  }

  export type xp_systemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type xp_systemCreateManyInput = {
    id: string
    user_id: string
    source: string
    amount: number
    created_at?: Date | string | null
  }

  export type xp_systemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type xp_systemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateInput = {
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: bigint | number | null
    type?: string | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    refresh_token_expires_in?: number | null
    updatedat?: Date | string | null
    user: UserCreateNestedOneWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    userId: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: bigint | number | null
    type?: string | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    refresh_token_expires_in?: number | null
    updatedat?: Date | string | null
  }

  export type AccountUpdateInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountCreateManyInput = {
    userId: string
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: bigint | number | null
    type?: string | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    refresh_token_expires_in?: number | null
    updatedat?: Date | string | null
  }

  export type AccountUpdateManyMutationInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type User_achievementsListRelationFilter = {
    every?: user_achievementsWhereInput
    some?: user_achievementsWhereInput
    none?: user_achievementsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type user_achievementsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type achievementsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    xp_reward?: SortOrder
    created_at?: SortOrder
  }

  export type achievementsAvgOrderByAggregateInput = {
    xp_reward?: SortOrder
  }

  export type achievementsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    xp_reward?: SortOrder
    created_at?: SortOrder
  }

  export type achievementsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    xp_reward?: SortOrder
    created_at?: SortOrder
  }

  export type achievementsSumOrderByAggregateInput = {
    xp_reward?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type Chat_sessionsScalarRelationFilter = {
    is?: chat_sessionsWhereInput
    isNot?: chat_sessionsWhereInput
  }

  export type chat_historyCountOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    sender?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chat_historyMaxOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    sender?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chat_historyMinOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    sender?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type Chat_historyListRelationFilter = {
    every?: chat_historyWhereInput
    some?: chat_historyWhereInput
    none?: chat_historyWhereInput
  }

  export type ClassesScalarRelationFilter = {
    is?: classesWhereInput
    isNot?: classesWhereInput
  }

  export type TopicsScalarRelationFilter = {
    is?: topicsWhereInput
    isNot?: topicsWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type chat_historyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type chat_sessionsCountOrderByAggregateInput = {
    session_id?: SortOrder
    class_code?: SortOrder
    user_id?: SortOrder
    topic_id?: SortOrder
    started_at?: SortOrder
    created_at?: SortOrder
  }

  export type chat_sessionsMaxOrderByAggregateInput = {
    session_id?: SortOrder
    class_code?: SortOrder
    user_id?: SortOrder
    topic_id?: SortOrder
    started_at?: SortOrder
    created_at?: SortOrder
  }

  export type chat_sessionsMinOrderByAggregateInput = {
    session_id?: SortOrder
    class_code?: SortOrder
    user_id?: SortOrder
    topic_id?: SortOrder
    started_at?: SortOrder
    created_at?: SortOrder
  }

  export type Chat_sessionsListRelationFilter = {
    every?: chat_sessionsWhereInput
    some?: chat_sessionsWhereInput
    none?: chat_sessionsWhereInput
  }

  export type Daily_topic_metricsListRelationFilter = {
    every?: daily_topic_metricsWhereInput
    some?: daily_topic_metricsWhereInput
    none?: daily_topic_metricsWhereInput
  }

  export type TopicsListRelationFilter = {
    every?: topicsWhereInput
    some?: topicsWhereInput
    none?: topicsWhereInput
  }

  export type chat_sessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type daily_topic_metricsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type topicsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type classesCountOrderByAggregateInput = {
    class_code?: SortOrder
    subject?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
    syllabus_url?: SortOrder
  }

  export type classesMaxOrderByAggregateInput = {
    class_code?: SortOrder
    subject?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
    syllabus_url?: SortOrder
  }

  export type classesMinOrderByAggregateInput = {
    class_code?: SortOrder
    subject?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
    syllabus_url?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUser_idClass_codeTopic_idMetric_dateCompoundUniqueInput = {
    user_id: string
    class_code: string
    topic_id: string
    metric_date: Date | string
  }

  export type daily_topic_metricsCountOrderByAggregateInput = {
    user_id?: SortOrder
    class_code?: SortOrder
    topic_id?: SortOrder
    metric_date?: SortOrder
    avg_score?: SortOrder
  }

  export type daily_topic_metricsAvgOrderByAggregateInput = {
    avg_score?: SortOrder
  }

  export type daily_topic_metricsMaxOrderByAggregateInput = {
    user_id?: SortOrder
    class_code?: SortOrder
    topic_id?: SortOrder
    metric_date?: SortOrder
    avg_score?: SortOrder
  }

  export type daily_topic_metricsMinOrderByAggregateInput = {
    user_id?: SortOrder
    class_code?: SortOrder
    topic_id?: SortOrder
    metric_date?: SortOrder
    avg_score?: SortOrder
  }

  export type daily_topic_metricsSumOrderByAggregateInput = {
    avg_score?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type friend_requestsCountOrderByAggregateInput = {
    id?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    responded_at?: SortOrder
  }

  export type friend_requestsMaxOrderByAggregateInput = {
    id?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    responded_at?: SortOrder
  }

  export type friend_requestsMinOrderByAggregateInput = {
    id?: SortOrder
    sender_id?: SortOrder
    receiver_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    responded_at?: SortOrder
  }

  export type friendsUser_idFriend_idCompoundUniqueInput = {
    user_id: string
    friend_id: string
  }

  export type friendsCountOrderByAggregateInput = {
    user_id?: SortOrder
    friend_id?: SortOrder
    created_at?: SortOrder
    streak?: SortOrder
    total_xp?: SortOrder
  }

  export type friendsAvgOrderByAggregateInput = {
    streak?: SortOrder
    total_xp?: SortOrder
  }

  export type friendsMaxOrderByAggregateInput = {
    user_id?: SortOrder
    friend_id?: SortOrder
    created_at?: SortOrder
    streak?: SortOrder
    total_xp?: SortOrder
  }

  export type friendsMinOrderByAggregateInput = {
    user_id?: SortOrder
    friend_id?: SortOrder
    created_at?: SortOrder
    streak?: SortOrder
    total_xp?: SortOrder
  }

  export type friendsSumOrderByAggregateInput = {
    streak?: SortOrder
    total_xp?: SortOrder
  }

  export type topicsCountOrderByAggregateInput = {
    id?: SortOrder
    class_code?: SortOrder
    name?: SortOrder
  }

  export type topicsMaxOrderByAggregateInput = {
    id?: SortOrder
    class_code?: SortOrder
    name?: SortOrder
  }

  export type topicsMinOrderByAggregateInput = {
    id?: SortOrder
    class_code?: SortOrder
    name?: SortOrder
  }

  export type AchievementsScalarRelationFilter = {
    is?: achievementsWhereInput
    isNot?: achievementsWhereInput
  }

  export type user_achievementsUser_idAchievement_idCompoundUniqueInput = {
    user_id: string
    achievement_id: string
  }

  export type user_achievementsCountOrderByAggregateInput = {
    user_id?: SortOrder
    achievement_id?: SortOrder
    earned_at?: SortOrder
  }

  export type user_achievementsMaxOrderByAggregateInput = {
    user_id?: SortOrder
    achievement_id?: SortOrder
    earned_at?: SortOrder
  }

  export type user_achievementsMinOrderByAggregateInput = {
    user_id?: SortOrder
    achievement_id?: SortOrder
    earned_at?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type xp_systemCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    source?: SortOrder
    amount?: SortOrder
    created_at?: SortOrder
  }

  export type xp_systemAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type xp_systemMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    source?: SortOrder
    amount?: SortOrder
    created_at?: SortOrder
  }

  export type xp_systemMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    source?: SortOrder
    amount?: SortOrder
    created_at?: SortOrder
  }

  export type xp_systemSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type Friend_requestsListRelationFilter = {
    every?: friend_requestsWhereInput
    some?: friend_requestsWhereInput
    none?: friend_requestsWhereInput
  }

  export type FriendsListRelationFilter = {
    every?: friendsWhereInput
    some?: friendsWhereInput
    none?: friendsWhereInput
  }

  export type Xp_systemListRelationFilter = {
    every?: xp_systemWhereInput
    some?: xp_systemWhereInput
    none?: xp_systemWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type friend_requestsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type friendsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type xp_systemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    total_xp?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    school?: SortOrder
    major?: SortOrder
    class_status?: SortOrder
    streak?: SortOrder
    weekly_xp?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    total_xp?: SortOrder
    streak?: SortOrder
    weekly_xp?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    total_xp?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    school?: SortOrder
    major?: SortOrder
    class_status?: SortOrder
    streak?: SortOrder
    weekly_xp?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    total_xp?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    school?: SortOrder
    major?: SortOrder
    class_status?: SortOrder
    streak?: SortOrder
    weekly_xp?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    total_xp?: SortOrder
    streak?: SortOrder
    weekly_xp?: SortOrder
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    type?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refresh_token_expires_in?: SortOrder
    updatedat?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    type?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refresh_token_expires_in?: SortOrder
    updatedat?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    userId?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    type?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refresh_token_expires_in?: SortOrder
    updatedat?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type user_achievementsCreateNestedManyWithoutAchievementsInput = {
    create?: XOR<user_achievementsCreateWithoutAchievementsInput, user_achievementsUncheckedCreateWithoutAchievementsInput> | user_achievementsCreateWithoutAchievementsInput[] | user_achievementsUncheckedCreateWithoutAchievementsInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutAchievementsInput | user_achievementsCreateOrConnectWithoutAchievementsInput[]
    createMany?: user_achievementsCreateManyAchievementsInputEnvelope
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
  }

  export type user_achievementsUncheckedCreateNestedManyWithoutAchievementsInput = {
    create?: XOR<user_achievementsCreateWithoutAchievementsInput, user_achievementsUncheckedCreateWithoutAchievementsInput> | user_achievementsCreateWithoutAchievementsInput[] | user_achievementsUncheckedCreateWithoutAchievementsInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutAchievementsInput | user_achievementsCreateOrConnectWithoutAchievementsInput[]
    createMany?: user_achievementsCreateManyAchievementsInputEnvelope
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type user_achievementsUpdateManyWithoutAchievementsNestedInput = {
    create?: XOR<user_achievementsCreateWithoutAchievementsInput, user_achievementsUncheckedCreateWithoutAchievementsInput> | user_achievementsCreateWithoutAchievementsInput[] | user_achievementsUncheckedCreateWithoutAchievementsInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutAchievementsInput | user_achievementsCreateOrConnectWithoutAchievementsInput[]
    upsert?: user_achievementsUpsertWithWhereUniqueWithoutAchievementsInput | user_achievementsUpsertWithWhereUniqueWithoutAchievementsInput[]
    createMany?: user_achievementsCreateManyAchievementsInputEnvelope
    set?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    disconnect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    delete?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    update?: user_achievementsUpdateWithWhereUniqueWithoutAchievementsInput | user_achievementsUpdateWithWhereUniqueWithoutAchievementsInput[]
    updateMany?: user_achievementsUpdateManyWithWhereWithoutAchievementsInput | user_achievementsUpdateManyWithWhereWithoutAchievementsInput[]
    deleteMany?: user_achievementsScalarWhereInput | user_achievementsScalarWhereInput[]
  }

  export type user_achievementsUncheckedUpdateManyWithoutAchievementsNestedInput = {
    create?: XOR<user_achievementsCreateWithoutAchievementsInput, user_achievementsUncheckedCreateWithoutAchievementsInput> | user_achievementsCreateWithoutAchievementsInput[] | user_achievementsUncheckedCreateWithoutAchievementsInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutAchievementsInput | user_achievementsCreateOrConnectWithoutAchievementsInput[]
    upsert?: user_achievementsUpsertWithWhereUniqueWithoutAchievementsInput | user_achievementsUpsertWithWhereUniqueWithoutAchievementsInput[]
    createMany?: user_achievementsCreateManyAchievementsInputEnvelope
    set?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    disconnect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    delete?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    update?: user_achievementsUpdateWithWhereUniqueWithoutAchievementsInput | user_achievementsUpdateWithWhereUniqueWithoutAchievementsInput[]
    updateMany?: user_achievementsUpdateManyWithWhereWithoutAchievementsInput | user_achievementsUpdateManyWithWhereWithoutAchievementsInput[]
    deleteMany?: user_achievementsScalarWhereInput | user_achievementsScalarWhereInput[]
  }

  export type chat_sessionsCreateNestedOneWithoutChat_historyInput = {
    create?: XOR<chat_sessionsCreateWithoutChat_historyInput, chat_sessionsUncheckedCreateWithoutChat_historyInput>
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutChat_historyInput
    connect?: chat_sessionsWhereUniqueInput
  }

  export type chat_sessionsUpdateOneRequiredWithoutChat_historyNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutChat_historyInput, chat_sessionsUncheckedCreateWithoutChat_historyInput>
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutChat_historyInput
    upsert?: chat_sessionsUpsertWithoutChat_historyInput
    connect?: chat_sessionsWhereUniqueInput
    update?: XOR<XOR<chat_sessionsUpdateToOneWithWhereWithoutChat_historyInput, chat_sessionsUpdateWithoutChat_historyInput>, chat_sessionsUncheckedUpdateWithoutChat_historyInput>
  }

  export type chat_historyCreateNestedManyWithoutChat_sessionsInput = {
    create?: XOR<chat_historyCreateWithoutChat_sessionsInput, chat_historyUncheckedCreateWithoutChat_sessionsInput> | chat_historyCreateWithoutChat_sessionsInput[] | chat_historyUncheckedCreateWithoutChat_sessionsInput[]
    connectOrCreate?: chat_historyCreateOrConnectWithoutChat_sessionsInput | chat_historyCreateOrConnectWithoutChat_sessionsInput[]
    createMany?: chat_historyCreateManyChat_sessionsInputEnvelope
    connect?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
  }

  export type classesCreateNestedOneWithoutChat_sessionsInput = {
    create?: XOR<classesCreateWithoutChat_sessionsInput, classesUncheckedCreateWithoutChat_sessionsInput>
    connectOrCreate?: classesCreateOrConnectWithoutChat_sessionsInput
    connect?: classesWhereUniqueInput
  }

  export type topicsCreateNestedOneWithoutChat_sessionsInput = {
    create?: XOR<topicsCreateWithoutChat_sessionsInput, topicsUncheckedCreateWithoutChat_sessionsInput>
    connectOrCreate?: topicsCreateOrConnectWithoutChat_sessionsInput
    connect?: topicsWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChat_sessionsInput = {
    create?: XOR<UserCreateWithoutChat_sessionsInput, UserUncheckedCreateWithoutChat_sessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChat_sessionsInput
    connect?: UserWhereUniqueInput
  }

  export type chat_historyUncheckedCreateNestedManyWithoutChat_sessionsInput = {
    create?: XOR<chat_historyCreateWithoutChat_sessionsInput, chat_historyUncheckedCreateWithoutChat_sessionsInput> | chat_historyCreateWithoutChat_sessionsInput[] | chat_historyUncheckedCreateWithoutChat_sessionsInput[]
    connectOrCreate?: chat_historyCreateOrConnectWithoutChat_sessionsInput | chat_historyCreateOrConnectWithoutChat_sessionsInput[]
    createMany?: chat_historyCreateManyChat_sessionsInputEnvelope
    connect?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
  }

  export type chat_historyUpdateManyWithoutChat_sessionsNestedInput = {
    create?: XOR<chat_historyCreateWithoutChat_sessionsInput, chat_historyUncheckedCreateWithoutChat_sessionsInput> | chat_historyCreateWithoutChat_sessionsInput[] | chat_historyUncheckedCreateWithoutChat_sessionsInput[]
    connectOrCreate?: chat_historyCreateOrConnectWithoutChat_sessionsInput | chat_historyCreateOrConnectWithoutChat_sessionsInput[]
    upsert?: chat_historyUpsertWithWhereUniqueWithoutChat_sessionsInput | chat_historyUpsertWithWhereUniqueWithoutChat_sessionsInput[]
    createMany?: chat_historyCreateManyChat_sessionsInputEnvelope
    set?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    disconnect?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    delete?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    connect?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    update?: chat_historyUpdateWithWhereUniqueWithoutChat_sessionsInput | chat_historyUpdateWithWhereUniqueWithoutChat_sessionsInput[]
    updateMany?: chat_historyUpdateManyWithWhereWithoutChat_sessionsInput | chat_historyUpdateManyWithWhereWithoutChat_sessionsInput[]
    deleteMany?: chat_historyScalarWhereInput | chat_historyScalarWhereInput[]
  }

  export type classesUpdateOneRequiredWithoutChat_sessionsNestedInput = {
    create?: XOR<classesCreateWithoutChat_sessionsInput, classesUncheckedCreateWithoutChat_sessionsInput>
    connectOrCreate?: classesCreateOrConnectWithoutChat_sessionsInput
    upsert?: classesUpsertWithoutChat_sessionsInput
    connect?: classesWhereUniqueInput
    update?: XOR<XOR<classesUpdateToOneWithWhereWithoutChat_sessionsInput, classesUpdateWithoutChat_sessionsInput>, classesUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type topicsUpdateOneRequiredWithoutChat_sessionsNestedInput = {
    create?: XOR<topicsCreateWithoutChat_sessionsInput, topicsUncheckedCreateWithoutChat_sessionsInput>
    connectOrCreate?: topicsCreateOrConnectWithoutChat_sessionsInput
    upsert?: topicsUpsertWithoutChat_sessionsInput
    connect?: topicsWhereUniqueInput
    update?: XOR<XOR<topicsUpdateToOneWithWhereWithoutChat_sessionsInput, topicsUpdateWithoutChat_sessionsInput>, topicsUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type UserUpdateOneRequiredWithoutChat_sessionsNestedInput = {
    create?: XOR<UserCreateWithoutChat_sessionsInput, UserUncheckedCreateWithoutChat_sessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChat_sessionsInput
    upsert?: UserUpsertWithoutChat_sessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChat_sessionsInput, UserUpdateWithoutChat_sessionsInput>, UserUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type chat_historyUncheckedUpdateManyWithoutChat_sessionsNestedInput = {
    create?: XOR<chat_historyCreateWithoutChat_sessionsInput, chat_historyUncheckedCreateWithoutChat_sessionsInput> | chat_historyCreateWithoutChat_sessionsInput[] | chat_historyUncheckedCreateWithoutChat_sessionsInput[]
    connectOrCreate?: chat_historyCreateOrConnectWithoutChat_sessionsInput | chat_historyCreateOrConnectWithoutChat_sessionsInput[]
    upsert?: chat_historyUpsertWithWhereUniqueWithoutChat_sessionsInput | chat_historyUpsertWithWhereUniqueWithoutChat_sessionsInput[]
    createMany?: chat_historyCreateManyChat_sessionsInputEnvelope
    set?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    disconnect?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    delete?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    connect?: chat_historyWhereUniqueInput | chat_historyWhereUniqueInput[]
    update?: chat_historyUpdateWithWhereUniqueWithoutChat_sessionsInput | chat_historyUpdateWithWhereUniqueWithoutChat_sessionsInput[]
    updateMany?: chat_historyUpdateManyWithWhereWithoutChat_sessionsInput | chat_historyUpdateManyWithWhereWithoutChat_sessionsInput[]
    deleteMany?: chat_historyScalarWhereInput | chat_historyScalarWhereInput[]
  }

  export type chat_sessionsCreateNestedManyWithoutClassesInput = {
    create?: XOR<chat_sessionsCreateWithoutClassesInput, chat_sessionsUncheckedCreateWithoutClassesInput> | chat_sessionsCreateWithoutClassesInput[] | chat_sessionsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutClassesInput | chat_sessionsCreateOrConnectWithoutClassesInput[]
    createMany?: chat_sessionsCreateManyClassesInputEnvelope
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
  }

  export type daily_topic_metricsCreateNestedManyWithoutClassesInput = {
    create?: XOR<daily_topic_metricsCreateWithoutClassesInput, daily_topic_metricsUncheckedCreateWithoutClassesInput> | daily_topic_metricsCreateWithoutClassesInput[] | daily_topic_metricsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutClassesInput | daily_topic_metricsCreateOrConnectWithoutClassesInput[]
    createMany?: daily_topic_metricsCreateManyClassesInputEnvelope
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
  }

  export type topicsCreateNestedManyWithoutClassesInput = {
    create?: XOR<topicsCreateWithoutClassesInput, topicsUncheckedCreateWithoutClassesInput> | topicsCreateWithoutClassesInput[] | topicsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: topicsCreateOrConnectWithoutClassesInput | topicsCreateOrConnectWithoutClassesInput[]
    createMany?: topicsCreateManyClassesInputEnvelope
    connect?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
  }

  export type chat_sessionsUncheckedCreateNestedManyWithoutClassesInput = {
    create?: XOR<chat_sessionsCreateWithoutClassesInput, chat_sessionsUncheckedCreateWithoutClassesInput> | chat_sessionsCreateWithoutClassesInput[] | chat_sessionsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutClassesInput | chat_sessionsCreateOrConnectWithoutClassesInput[]
    createMany?: chat_sessionsCreateManyClassesInputEnvelope
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
  }

  export type daily_topic_metricsUncheckedCreateNestedManyWithoutClassesInput = {
    create?: XOR<daily_topic_metricsCreateWithoutClassesInput, daily_topic_metricsUncheckedCreateWithoutClassesInput> | daily_topic_metricsCreateWithoutClassesInput[] | daily_topic_metricsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutClassesInput | daily_topic_metricsCreateOrConnectWithoutClassesInput[]
    createMany?: daily_topic_metricsCreateManyClassesInputEnvelope
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
  }

  export type topicsUncheckedCreateNestedManyWithoutClassesInput = {
    create?: XOR<topicsCreateWithoutClassesInput, topicsUncheckedCreateWithoutClassesInput> | topicsCreateWithoutClassesInput[] | topicsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: topicsCreateOrConnectWithoutClassesInput | topicsCreateOrConnectWithoutClassesInput[]
    createMany?: topicsCreateManyClassesInputEnvelope
    connect?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
  }

  export type chat_sessionsUpdateManyWithoutClassesNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutClassesInput, chat_sessionsUncheckedCreateWithoutClassesInput> | chat_sessionsCreateWithoutClassesInput[] | chat_sessionsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutClassesInput | chat_sessionsCreateOrConnectWithoutClassesInput[]
    upsert?: chat_sessionsUpsertWithWhereUniqueWithoutClassesInput | chat_sessionsUpsertWithWhereUniqueWithoutClassesInput[]
    createMany?: chat_sessionsCreateManyClassesInputEnvelope
    set?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    disconnect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    delete?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    update?: chat_sessionsUpdateWithWhereUniqueWithoutClassesInput | chat_sessionsUpdateWithWhereUniqueWithoutClassesInput[]
    updateMany?: chat_sessionsUpdateManyWithWhereWithoutClassesInput | chat_sessionsUpdateManyWithWhereWithoutClassesInput[]
    deleteMany?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
  }

  export type daily_topic_metricsUpdateManyWithoutClassesNestedInput = {
    create?: XOR<daily_topic_metricsCreateWithoutClassesInput, daily_topic_metricsUncheckedCreateWithoutClassesInput> | daily_topic_metricsCreateWithoutClassesInput[] | daily_topic_metricsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutClassesInput | daily_topic_metricsCreateOrConnectWithoutClassesInput[]
    upsert?: daily_topic_metricsUpsertWithWhereUniqueWithoutClassesInput | daily_topic_metricsUpsertWithWhereUniqueWithoutClassesInput[]
    createMany?: daily_topic_metricsCreateManyClassesInputEnvelope
    set?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    disconnect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    delete?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    update?: daily_topic_metricsUpdateWithWhereUniqueWithoutClassesInput | daily_topic_metricsUpdateWithWhereUniqueWithoutClassesInput[]
    updateMany?: daily_topic_metricsUpdateManyWithWhereWithoutClassesInput | daily_topic_metricsUpdateManyWithWhereWithoutClassesInput[]
    deleteMany?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
  }

  export type topicsUpdateManyWithoutClassesNestedInput = {
    create?: XOR<topicsCreateWithoutClassesInput, topicsUncheckedCreateWithoutClassesInput> | topicsCreateWithoutClassesInput[] | topicsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: topicsCreateOrConnectWithoutClassesInput | topicsCreateOrConnectWithoutClassesInput[]
    upsert?: topicsUpsertWithWhereUniqueWithoutClassesInput | topicsUpsertWithWhereUniqueWithoutClassesInput[]
    createMany?: topicsCreateManyClassesInputEnvelope
    set?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    disconnect?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    delete?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    connect?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    update?: topicsUpdateWithWhereUniqueWithoutClassesInput | topicsUpdateWithWhereUniqueWithoutClassesInput[]
    updateMany?: topicsUpdateManyWithWhereWithoutClassesInput | topicsUpdateManyWithWhereWithoutClassesInput[]
    deleteMany?: topicsScalarWhereInput | topicsScalarWhereInput[]
  }

  export type chat_sessionsUncheckedUpdateManyWithoutClassesNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutClassesInput, chat_sessionsUncheckedCreateWithoutClassesInput> | chat_sessionsCreateWithoutClassesInput[] | chat_sessionsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutClassesInput | chat_sessionsCreateOrConnectWithoutClassesInput[]
    upsert?: chat_sessionsUpsertWithWhereUniqueWithoutClassesInput | chat_sessionsUpsertWithWhereUniqueWithoutClassesInput[]
    createMany?: chat_sessionsCreateManyClassesInputEnvelope
    set?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    disconnect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    delete?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    update?: chat_sessionsUpdateWithWhereUniqueWithoutClassesInput | chat_sessionsUpdateWithWhereUniqueWithoutClassesInput[]
    updateMany?: chat_sessionsUpdateManyWithWhereWithoutClassesInput | chat_sessionsUpdateManyWithWhereWithoutClassesInput[]
    deleteMany?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
  }

  export type daily_topic_metricsUncheckedUpdateManyWithoutClassesNestedInput = {
    create?: XOR<daily_topic_metricsCreateWithoutClassesInput, daily_topic_metricsUncheckedCreateWithoutClassesInput> | daily_topic_metricsCreateWithoutClassesInput[] | daily_topic_metricsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutClassesInput | daily_topic_metricsCreateOrConnectWithoutClassesInput[]
    upsert?: daily_topic_metricsUpsertWithWhereUniqueWithoutClassesInput | daily_topic_metricsUpsertWithWhereUniqueWithoutClassesInput[]
    createMany?: daily_topic_metricsCreateManyClassesInputEnvelope
    set?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    disconnect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    delete?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    update?: daily_topic_metricsUpdateWithWhereUniqueWithoutClassesInput | daily_topic_metricsUpdateWithWhereUniqueWithoutClassesInput[]
    updateMany?: daily_topic_metricsUpdateManyWithWhereWithoutClassesInput | daily_topic_metricsUpdateManyWithWhereWithoutClassesInput[]
    deleteMany?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
  }

  export type topicsUncheckedUpdateManyWithoutClassesNestedInput = {
    create?: XOR<topicsCreateWithoutClassesInput, topicsUncheckedCreateWithoutClassesInput> | topicsCreateWithoutClassesInput[] | topicsUncheckedCreateWithoutClassesInput[]
    connectOrCreate?: topicsCreateOrConnectWithoutClassesInput | topicsCreateOrConnectWithoutClassesInput[]
    upsert?: topicsUpsertWithWhereUniqueWithoutClassesInput | topicsUpsertWithWhereUniqueWithoutClassesInput[]
    createMany?: topicsCreateManyClassesInputEnvelope
    set?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    disconnect?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    delete?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    connect?: topicsWhereUniqueInput | topicsWhereUniqueInput[]
    update?: topicsUpdateWithWhereUniqueWithoutClassesInput | topicsUpdateWithWhereUniqueWithoutClassesInput[]
    updateMany?: topicsUpdateManyWithWhereWithoutClassesInput | topicsUpdateManyWithWhereWithoutClassesInput[]
    deleteMany?: topicsScalarWhereInput | topicsScalarWhereInput[]
  }

  export type classesCreateNestedOneWithoutDaily_topic_metricsInput = {
    create?: XOR<classesCreateWithoutDaily_topic_metricsInput, classesUncheckedCreateWithoutDaily_topic_metricsInput>
    connectOrCreate?: classesCreateOrConnectWithoutDaily_topic_metricsInput
    connect?: classesWhereUniqueInput
  }

  export type topicsCreateNestedOneWithoutDaily_topic_metricsInput = {
    create?: XOR<topicsCreateWithoutDaily_topic_metricsInput, topicsUncheckedCreateWithoutDaily_topic_metricsInput>
    connectOrCreate?: topicsCreateOrConnectWithoutDaily_topic_metricsInput
    connect?: topicsWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDaily_topic_metricsInput = {
    create?: XOR<UserCreateWithoutDaily_topic_metricsInput, UserUncheckedCreateWithoutDaily_topic_metricsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDaily_topic_metricsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type classesUpdateOneRequiredWithoutDaily_topic_metricsNestedInput = {
    create?: XOR<classesCreateWithoutDaily_topic_metricsInput, classesUncheckedCreateWithoutDaily_topic_metricsInput>
    connectOrCreate?: classesCreateOrConnectWithoutDaily_topic_metricsInput
    upsert?: classesUpsertWithoutDaily_topic_metricsInput
    connect?: classesWhereUniqueInput
    update?: XOR<XOR<classesUpdateToOneWithWhereWithoutDaily_topic_metricsInput, classesUpdateWithoutDaily_topic_metricsInput>, classesUncheckedUpdateWithoutDaily_topic_metricsInput>
  }

  export type topicsUpdateOneRequiredWithoutDaily_topic_metricsNestedInput = {
    create?: XOR<topicsCreateWithoutDaily_topic_metricsInput, topicsUncheckedCreateWithoutDaily_topic_metricsInput>
    connectOrCreate?: topicsCreateOrConnectWithoutDaily_topic_metricsInput
    upsert?: topicsUpsertWithoutDaily_topic_metricsInput
    connect?: topicsWhereUniqueInput
    update?: XOR<XOR<topicsUpdateToOneWithWhereWithoutDaily_topic_metricsInput, topicsUpdateWithoutDaily_topic_metricsInput>, topicsUncheckedUpdateWithoutDaily_topic_metricsInput>
  }

  export type UserUpdateOneRequiredWithoutDaily_topic_metricsNestedInput = {
    create?: XOR<UserCreateWithoutDaily_topic_metricsInput, UserUncheckedCreateWithoutDaily_topic_metricsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDaily_topic_metricsInput
    upsert?: UserUpsertWithoutDaily_topic_metricsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDaily_topic_metricsInput, UserUpdateWithoutDaily_topic_metricsInput>, UserUncheckedUpdateWithoutDaily_topic_metricsInput>
  }

  export type UserCreateNestedOneWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    create?: XOR<UserCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriend_requests_friend_requests_receiver_idTousersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    create?: XOR<UserCreateWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_sender_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriend_requests_friend_requests_sender_idTousersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFriend_requests_friend_requests_receiver_idTousersNestedInput = {
    create?: XOR<UserCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriend_requests_friend_requests_receiver_idTousersInput
    upsert?: UserUpsertWithoutFriend_requests_friend_requests_receiver_idTousersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput>, UserUncheckedUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
  }

  export type UserUpdateOneRequiredWithoutFriend_requests_friend_requests_sender_idTousersNestedInput = {
    create?: XOR<UserCreateWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_sender_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriend_requests_friend_requests_sender_idTousersInput
    upsert?: UserUpsertWithoutFriend_requests_friend_requests_sender_idTousersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput>, UserUncheckedUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput>
  }

  export type UserCreateNestedOneWithoutFriends_friends_friend_idTousersInput = {
    create?: XOR<UserCreateWithoutFriends_friends_friend_idTousersInput, UserUncheckedCreateWithoutFriends_friends_friend_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriends_friends_friend_idTousersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriends_friends_user_idTousersInput = {
    create?: XOR<UserCreateWithoutFriends_friends_user_idTousersInput, UserUncheckedCreateWithoutFriends_friends_user_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriends_friends_user_idTousersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFriends_friends_friend_idTousersNestedInput = {
    create?: XOR<UserCreateWithoutFriends_friends_friend_idTousersInput, UserUncheckedCreateWithoutFriends_friends_friend_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriends_friends_friend_idTousersInput
    upsert?: UserUpsertWithoutFriends_friends_friend_idTousersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriends_friends_friend_idTousersInput, UserUpdateWithoutFriends_friends_friend_idTousersInput>, UserUncheckedUpdateWithoutFriends_friends_friend_idTousersInput>
  }

  export type UserUpdateOneRequiredWithoutFriends_friends_user_idTousersNestedInput = {
    create?: XOR<UserCreateWithoutFriends_friends_user_idTousersInput, UserUncheckedCreateWithoutFriends_friends_user_idTousersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriends_friends_user_idTousersInput
    upsert?: UserUpsertWithoutFriends_friends_user_idTousersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriends_friends_user_idTousersInput, UserUpdateWithoutFriends_friends_user_idTousersInput>, UserUncheckedUpdateWithoutFriends_friends_user_idTousersInput>
  }

  export type chat_sessionsCreateNestedManyWithoutTopicsInput = {
    create?: XOR<chat_sessionsCreateWithoutTopicsInput, chat_sessionsUncheckedCreateWithoutTopicsInput> | chat_sessionsCreateWithoutTopicsInput[] | chat_sessionsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutTopicsInput | chat_sessionsCreateOrConnectWithoutTopicsInput[]
    createMany?: chat_sessionsCreateManyTopicsInputEnvelope
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
  }

  export type daily_topic_metricsCreateNestedManyWithoutTopicsInput = {
    create?: XOR<daily_topic_metricsCreateWithoutTopicsInput, daily_topic_metricsUncheckedCreateWithoutTopicsInput> | daily_topic_metricsCreateWithoutTopicsInput[] | daily_topic_metricsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutTopicsInput | daily_topic_metricsCreateOrConnectWithoutTopicsInput[]
    createMany?: daily_topic_metricsCreateManyTopicsInputEnvelope
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
  }

  export type classesCreateNestedOneWithoutTopicsInput = {
    create?: XOR<classesCreateWithoutTopicsInput, classesUncheckedCreateWithoutTopicsInput>
    connectOrCreate?: classesCreateOrConnectWithoutTopicsInput
    connect?: classesWhereUniqueInput
  }

  export type chat_sessionsUncheckedCreateNestedManyWithoutTopicsInput = {
    create?: XOR<chat_sessionsCreateWithoutTopicsInput, chat_sessionsUncheckedCreateWithoutTopicsInput> | chat_sessionsCreateWithoutTopicsInput[] | chat_sessionsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutTopicsInput | chat_sessionsCreateOrConnectWithoutTopicsInput[]
    createMany?: chat_sessionsCreateManyTopicsInputEnvelope
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
  }

  export type daily_topic_metricsUncheckedCreateNestedManyWithoutTopicsInput = {
    create?: XOR<daily_topic_metricsCreateWithoutTopicsInput, daily_topic_metricsUncheckedCreateWithoutTopicsInput> | daily_topic_metricsCreateWithoutTopicsInput[] | daily_topic_metricsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutTopicsInput | daily_topic_metricsCreateOrConnectWithoutTopicsInput[]
    createMany?: daily_topic_metricsCreateManyTopicsInputEnvelope
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
  }

  export type chat_sessionsUpdateManyWithoutTopicsNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutTopicsInput, chat_sessionsUncheckedCreateWithoutTopicsInput> | chat_sessionsCreateWithoutTopicsInput[] | chat_sessionsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutTopicsInput | chat_sessionsCreateOrConnectWithoutTopicsInput[]
    upsert?: chat_sessionsUpsertWithWhereUniqueWithoutTopicsInput | chat_sessionsUpsertWithWhereUniqueWithoutTopicsInput[]
    createMany?: chat_sessionsCreateManyTopicsInputEnvelope
    set?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    disconnect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    delete?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    update?: chat_sessionsUpdateWithWhereUniqueWithoutTopicsInput | chat_sessionsUpdateWithWhereUniqueWithoutTopicsInput[]
    updateMany?: chat_sessionsUpdateManyWithWhereWithoutTopicsInput | chat_sessionsUpdateManyWithWhereWithoutTopicsInput[]
    deleteMany?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
  }

  export type daily_topic_metricsUpdateManyWithoutTopicsNestedInput = {
    create?: XOR<daily_topic_metricsCreateWithoutTopicsInput, daily_topic_metricsUncheckedCreateWithoutTopicsInput> | daily_topic_metricsCreateWithoutTopicsInput[] | daily_topic_metricsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutTopicsInput | daily_topic_metricsCreateOrConnectWithoutTopicsInput[]
    upsert?: daily_topic_metricsUpsertWithWhereUniqueWithoutTopicsInput | daily_topic_metricsUpsertWithWhereUniqueWithoutTopicsInput[]
    createMany?: daily_topic_metricsCreateManyTopicsInputEnvelope
    set?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    disconnect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    delete?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    update?: daily_topic_metricsUpdateWithWhereUniqueWithoutTopicsInput | daily_topic_metricsUpdateWithWhereUniqueWithoutTopicsInput[]
    updateMany?: daily_topic_metricsUpdateManyWithWhereWithoutTopicsInput | daily_topic_metricsUpdateManyWithWhereWithoutTopicsInput[]
    deleteMany?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
  }

  export type classesUpdateOneRequiredWithoutTopicsNestedInput = {
    create?: XOR<classesCreateWithoutTopicsInput, classesUncheckedCreateWithoutTopicsInput>
    connectOrCreate?: classesCreateOrConnectWithoutTopicsInput
    upsert?: classesUpsertWithoutTopicsInput
    connect?: classesWhereUniqueInput
    update?: XOR<XOR<classesUpdateToOneWithWhereWithoutTopicsInput, classesUpdateWithoutTopicsInput>, classesUncheckedUpdateWithoutTopicsInput>
  }

  export type chat_sessionsUncheckedUpdateManyWithoutTopicsNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutTopicsInput, chat_sessionsUncheckedCreateWithoutTopicsInput> | chat_sessionsCreateWithoutTopicsInput[] | chat_sessionsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutTopicsInput | chat_sessionsCreateOrConnectWithoutTopicsInput[]
    upsert?: chat_sessionsUpsertWithWhereUniqueWithoutTopicsInput | chat_sessionsUpsertWithWhereUniqueWithoutTopicsInput[]
    createMany?: chat_sessionsCreateManyTopicsInputEnvelope
    set?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    disconnect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    delete?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    update?: chat_sessionsUpdateWithWhereUniqueWithoutTopicsInput | chat_sessionsUpdateWithWhereUniqueWithoutTopicsInput[]
    updateMany?: chat_sessionsUpdateManyWithWhereWithoutTopicsInput | chat_sessionsUpdateManyWithWhereWithoutTopicsInput[]
    deleteMany?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
  }

  export type daily_topic_metricsUncheckedUpdateManyWithoutTopicsNestedInput = {
    create?: XOR<daily_topic_metricsCreateWithoutTopicsInput, daily_topic_metricsUncheckedCreateWithoutTopicsInput> | daily_topic_metricsCreateWithoutTopicsInput[] | daily_topic_metricsUncheckedCreateWithoutTopicsInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutTopicsInput | daily_topic_metricsCreateOrConnectWithoutTopicsInput[]
    upsert?: daily_topic_metricsUpsertWithWhereUniqueWithoutTopicsInput | daily_topic_metricsUpsertWithWhereUniqueWithoutTopicsInput[]
    createMany?: daily_topic_metricsCreateManyTopicsInputEnvelope
    set?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    disconnect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    delete?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    update?: daily_topic_metricsUpdateWithWhereUniqueWithoutTopicsInput | daily_topic_metricsUpdateWithWhereUniqueWithoutTopicsInput[]
    updateMany?: daily_topic_metricsUpdateManyWithWhereWithoutTopicsInput | daily_topic_metricsUpdateManyWithWhereWithoutTopicsInput[]
    deleteMany?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
  }

  export type achievementsCreateNestedOneWithoutUser_achievementsInput = {
    create?: XOR<achievementsCreateWithoutUser_achievementsInput, achievementsUncheckedCreateWithoutUser_achievementsInput>
    connectOrCreate?: achievementsCreateOrConnectWithoutUser_achievementsInput
    connect?: achievementsWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUser_achievementsInput = {
    create?: XOR<UserCreateWithoutUser_achievementsInput, UserUncheckedCreateWithoutUser_achievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_achievementsInput
    connect?: UserWhereUniqueInput
  }

  export type achievementsUpdateOneRequiredWithoutUser_achievementsNestedInput = {
    create?: XOR<achievementsCreateWithoutUser_achievementsInput, achievementsUncheckedCreateWithoutUser_achievementsInput>
    connectOrCreate?: achievementsCreateOrConnectWithoutUser_achievementsInput
    upsert?: achievementsUpsertWithoutUser_achievementsInput
    connect?: achievementsWhereUniqueInput
    update?: XOR<XOR<achievementsUpdateToOneWithWhereWithoutUser_achievementsInput, achievementsUpdateWithoutUser_achievementsInput>, achievementsUncheckedUpdateWithoutUser_achievementsInput>
  }

  export type UserUpdateOneRequiredWithoutUser_achievementsNestedInput = {
    create?: XOR<UserCreateWithoutUser_achievementsInput, UserUncheckedCreateWithoutUser_achievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_achievementsInput
    upsert?: UserUpsertWithoutUser_achievementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUser_achievementsInput, UserUpdateWithoutUser_achievementsInput>, UserUncheckedUpdateWithoutUser_achievementsInput>
  }

  export type UserCreateNestedOneWithoutXp_systemInput = {
    create?: XOR<UserCreateWithoutXp_systemInput, UserUncheckedCreateWithoutXp_systemInput>
    connectOrCreate?: UserCreateOrConnectWithoutXp_systemInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutXp_systemNestedInput = {
    create?: XOR<UserCreateWithoutXp_systemInput, UserUncheckedCreateWithoutXp_systemInput>
    connectOrCreate?: UserCreateOrConnectWithoutXp_systemInput
    upsert?: UserUpsertWithoutXp_systemInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutXp_systemInput, UserUpdateWithoutXp_systemInput>, UserUncheckedUpdateWithoutXp_systemInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type chat_sessionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<chat_sessionsCreateWithoutUsersInput, chat_sessionsUncheckedCreateWithoutUsersInput> | chat_sessionsCreateWithoutUsersInput[] | chat_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutUsersInput | chat_sessionsCreateOrConnectWithoutUsersInput[]
    createMany?: chat_sessionsCreateManyUsersInputEnvelope
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
  }

  export type daily_topic_metricsCreateNestedManyWithoutUsersInput = {
    create?: XOR<daily_topic_metricsCreateWithoutUsersInput, daily_topic_metricsUncheckedCreateWithoutUsersInput> | daily_topic_metricsCreateWithoutUsersInput[] | daily_topic_metricsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutUsersInput | daily_topic_metricsCreateOrConnectWithoutUsersInput[]
    createMany?: daily_topic_metricsCreateManyUsersInputEnvelope
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
  }

  export type friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInputEnvelope
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
  }

  export type friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_sender_idTousersInputEnvelope
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
  }

  export type friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput> | friendsCreateWithoutUsers_friends_friend_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_friend_idTousersInputEnvelope
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
  }

  export type friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_user_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput> | friendsCreateWithoutUsers_friends_user_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_user_idTousersInputEnvelope
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
  }

  export type user_achievementsCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_achievementsCreateWithoutUsersInput, user_achievementsUncheckedCreateWithoutUsersInput> | user_achievementsCreateWithoutUsersInput[] | user_achievementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutUsersInput | user_achievementsCreateOrConnectWithoutUsersInput[]
    createMany?: user_achievementsCreateManyUsersInputEnvelope
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
  }

  export type xp_systemCreateNestedManyWithoutUsersInput = {
    create?: XOR<xp_systemCreateWithoutUsersInput, xp_systemUncheckedCreateWithoutUsersInput> | xp_systemCreateWithoutUsersInput[] | xp_systemUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: xp_systemCreateOrConnectWithoutUsersInput | xp_systemCreateOrConnectWithoutUsersInput[]
    createMany?: xp_systemCreateManyUsersInputEnvelope
    connect?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type chat_sessionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<chat_sessionsCreateWithoutUsersInput, chat_sessionsUncheckedCreateWithoutUsersInput> | chat_sessionsCreateWithoutUsersInput[] | chat_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutUsersInput | chat_sessionsCreateOrConnectWithoutUsersInput[]
    createMany?: chat_sessionsCreateManyUsersInputEnvelope
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
  }

  export type daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<daily_topic_metricsCreateWithoutUsersInput, daily_topic_metricsUncheckedCreateWithoutUsersInput> | daily_topic_metricsCreateWithoutUsersInput[] | daily_topic_metricsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutUsersInput | daily_topic_metricsCreateOrConnectWithoutUsersInput[]
    createMany?: daily_topic_metricsCreateManyUsersInputEnvelope
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
  }

  export type friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInputEnvelope
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
  }

  export type friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_sender_idTousersInputEnvelope
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
  }

  export type friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput> | friendsCreateWithoutUsers_friends_friend_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_friend_idTousersInputEnvelope
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
  }

  export type friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_user_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput> | friendsCreateWithoutUsers_friends_user_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_user_idTousersInputEnvelope
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
  }

  export type user_achievementsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_achievementsCreateWithoutUsersInput, user_achievementsUncheckedCreateWithoutUsersInput> | user_achievementsCreateWithoutUsersInput[] | user_achievementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutUsersInput | user_achievementsCreateOrConnectWithoutUsersInput[]
    createMany?: user_achievementsCreateManyUsersInputEnvelope
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
  }

  export type xp_systemUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<xp_systemCreateWithoutUsersInput, xp_systemUncheckedCreateWithoutUsersInput> | xp_systemCreateWithoutUsersInput[] | xp_systemUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: xp_systemCreateOrConnectWithoutUsersInput | xp_systemCreateOrConnectWithoutUsersInput[]
    createMany?: xp_systemCreateManyUsersInputEnvelope
    connect?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type chat_sessionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutUsersInput, chat_sessionsUncheckedCreateWithoutUsersInput> | chat_sessionsCreateWithoutUsersInput[] | chat_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutUsersInput | chat_sessionsCreateOrConnectWithoutUsersInput[]
    upsert?: chat_sessionsUpsertWithWhereUniqueWithoutUsersInput | chat_sessionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: chat_sessionsCreateManyUsersInputEnvelope
    set?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    disconnect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    delete?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    update?: chat_sessionsUpdateWithWhereUniqueWithoutUsersInput | chat_sessionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: chat_sessionsUpdateManyWithWhereWithoutUsersInput | chat_sessionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
  }

  export type daily_topic_metricsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<daily_topic_metricsCreateWithoutUsersInput, daily_topic_metricsUncheckedCreateWithoutUsersInput> | daily_topic_metricsCreateWithoutUsersInput[] | daily_topic_metricsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutUsersInput | daily_topic_metricsCreateOrConnectWithoutUsersInput[]
    upsert?: daily_topic_metricsUpsertWithWhereUniqueWithoutUsersInput | daily_topic_metricsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: daily_topic_metricsCreateManyUsersInputEnvelope
    set?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    disconnect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    delete?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    update?: daily_topic_metricsUpdateWithWhereUniqueWithoutUsersInput | daily_topic_metricsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: daily_topic_metricsUpdateManyWithWhereWithoutUsersInput | daily_topic_metricsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
  }

  export type friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput[]
    upsert?: friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInputEnvelope
    set?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    disconnect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    delete?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    update?: friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput[]
    updateMany?: friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_receiver_idTousersInput[]
    deleteMany?: friend_requestsScalarWhereInput | friend_requestsScalarWhereInput[]
  }

  export type friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput[]
    upsert?: friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_sender_idTousersInputEnvelope
    set?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    disconnect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    delete?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    update?: friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput[]
    updateMany?: friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_sender_idTousersInput[]
    deleteMany?: friend_requestsScalarWhereInput | friend_requestsScalarWhereInput[]
  }

  export type friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput> | friendsCreateWithoutUsers_friends_friend_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput[]
    upsert?: friendsUpsertWithWhereUniqueWithoutUsers_friends_friend_idTousersInput | friendsUpsertWithWhereUniqueWithoutUsers_friends_friend_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_friend_idTousersInputEnvelope
    set?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    disconnect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    delete?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    update?: friendsUpdateWithWhereUniqueWithoutUsers_friends_friend_idTousersInput | friendsUpdateWithWhereUniqueWithoutUsers_friends_friend_idTousersInput[]
    updateMany?: friendsUpdateManyWithWhereWithoutUsers_friends_friend_idTousersInput | friendsUpdateManyWithWhereWithoutUsers_friends_friend_idTousersInput[]
    deleteMany?: friendsScalarWhereInput | friendsScalarWhereInput[]
  }

  export type friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_user_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput> | friendsCreateWithoutUsers_friends_user_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput[]
    upsert?: friendsUpsertWithWhereUniqueWithoutUsers_friends_user_idTousersInput | friendsUpsertWithWhereUniqueWithoutUsers_friends_user_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_user_idTousersInputEnvelope
    set?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    disconnect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    delete?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    update?: friendsUpdateWithWhereUniqueWithoutUsers_friends_user_idTousersInput | friendsUpdateWithWhereUniqueWithoutUsers_friends_user_idTousersInput[]
    updateMany?: friendsUpdateManyWithWhereWithoutUsers_friends_user_idTousersInput | friendsUpdateManyWithWhereWithoutUsers_friends_user_idTousersInput[]
    deleteMany?: friendsScalarWhereInput | friendsScalarWhereInput[]
  }

  export type user_achievementsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_achievementsCreateWithoutUsersInput, user_achievementsUncheckedCreateWithoutUsersInput> | user_achievementsCreateWithoutUsersInput[] | user_achievementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutUsersInput | user_achievementsCreateOrConnectWithoutUsersInput[]
    upsert?: user_achievementsUpsertWithWhereUniqueWithoutUsersInput | user_achievementsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_achievementsCreateManyUsersInputEnvelope
    set?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    disconnect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    delete?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    update?: user_achievementsUpdateWithWhereUniqueWithoutUsersInput | user_achievementsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_achievementsUpdateManyWithWhereWithoutUsersInput | user_achievementsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_achievementsScalarWhereInput | user_achievementsScalarWhereInput[]
  }

  export type xp_systemUpdateManyWithoutUsersNestedInput = {
    create?: XOR<xp_systemCreateWithoutUsersInput, xp_systemUncheckedCreateWithoutUsersInput> | xp_systemCreateWithoutUsersInput[] | xp_systemUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: xp_systemCreateOrConnectWithoutUsersInput | xp_systemCreateOrConnectWithoutUsersInput[]
    upsert?: xp_systemUpsertWithWhereUniqueWithoutUsersInput | xp_systemUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: xp_systemCreateManyUsersInputEnvelope
    set?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    disconnect?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    delete?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    connect?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    update?: xp_systemUpdateWithWhereUniqueWithoutUsersInput | xp_systemUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: xp_systemUpdateManyWithWhereWithoutUsersInput | xp_systemUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: xp_systemScalarWhereInput | xp_systemScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<chat_sessionsCreateWithoutUsersInput, chat_sessionsUncheckedCreateWithoutUsersInput> | chat_sessionsCreateWithoutUsersInput[] | chat_sessionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: chat_sessionsCreateOrConnectWithoutUsersInput | chat_sessionsCreateOrConnectWithoutUsersInput[]
    upsert?: chat_sessionsUpsertWithWhereUniqueWithoutUsersInput | chat_sessionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: chat_sessionsCreateManyUsersInputEnvelope
    set?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    disconnect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    delete?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    connect?: chat_sessionsWhereUniqueInput | chat_sessionsWhereUniqueInput[]
    update?: chat_sessionsUpdateWithWhereUniqueWithoutUsersInput | chat_sessionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: chat_sessionsUpdateManyWithWhereWithoutUsersInput | chat_sessionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
  }

  export type daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<daily_topic_metricsCreateWithoutUsersInput, daily_topic_metricsUncheckedCreateWithoutUsersInput> | daily_topic_metricsCreateWithoutUsersInput[] | daily_topic_metricsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: daily_topic_metricsCreateOrConnectWithoutUsersInput | daily_topic_metricsCreateOrConnectWithoutUsersInput[]
    upsert?: daily_topic_metricsUpsertWithWhereUniqueWithoutUsersInput | daily_topic_metricsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: daily_topic_metricsCreateManyUsersInputEnvelope
    set?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    disconnect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    delete?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    connect?: daily_topic_metricsWhereUniqueInput | daily_topic_metricsWhereUniqueInput[]
    update?: daily_topic_metricsUpdateWithWhereUniqueWithoutUsersInput | daily_topic_metricsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: daily_topic_metricsUpdateManyWithWhereWithoutUsersInput | daily_topic_metricsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
  }

  export type friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput[]
    upsert?: friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInputEnvelope
    set?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    disconnect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    delete?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    update?: friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput[]
    updateMany?: friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_receiver_idTousersInput | friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_receiver_idTousersInput[]
    deleteMany?: friend_requestsScalarWhereInput | friend_requestsScalarWhereInput[]
  }

  export type friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput = {
    create?: XOR<friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput> | friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput[] | friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput[]
    connectOrCreate?: friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput[]
    upsert?: friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput[]
    createMany?: friend_requestsCreateManyUsers_friend_requests_sender_idTousersInputEnvelope
    set?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    disconnect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    delete?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    connect?: friend_requestsWhereUniqueInput | friend_requestsWhereUniqueInput[]
    update?: friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput[]
    updateMany?: friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_sender_idTousersInput | friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_sender_idTousersInput[]
    deleteMany?: friend_requestsScalarWhereInput | friend_requestsScalarWhereInput[]
  }

  export type friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput> | friendsCreateWithoutUsers_friends_friend_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput[]
    upsert?: friendsUpsertWithWhereUniqueWithoutUsers_friends_friend_idTousersInput | friendsUpsertWithWhereUniqueWithoutUsers_friends_friend_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_friend_idTousersInputEnvelope
    set?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    disconnect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    delete?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    update?: friendsUpdateWithWhereUniqueWithoutUsers_friends_friend_idTousersInput | friendsUpdateWithWhereUniqueWithoutUsers_friends_friend_idTousersInput[]
    updateMany?: friendsUpdateManyWithWhereWithoutUsers_friends_friend_idTousersInput | friendsUpdateManyWithWhereWithoutUsers_friends_friend_idTousersInput[]
    deleteMany?: friendsScalarWhereInput | friendsScalarWhereInput[]
  }

  export type friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput = {
    create?: XOR<friendsCreateWithoutUsers_friends_user_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput> | friendsCreateWithoutUsers_friends_user_idTousersInput[] | friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput[]
    connectOrCreate?: friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput | friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput[]
    upsert?: friendsUpsertWithWhereUniqueWithoutUsers_friends_user_idTousersInput | friendsUpsertWithWhereUniqueWithoutUsers_friends_user_idTousersInput[]
    createMany?: friendsCreateManyUsers_friends_user_idTousersInputEnvelope
    set?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    disconnect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    delete?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    connect?: friendsWhereUniqueInput | friendsWhereUniqueInput[]
    update?: friendsUpdateWithWhereUniqueWithoutUsers_friends_user_idTousersInput | friendsUpdateWithWhereUniqueWithoutUsers_friends_user_idTousersInput[]
    updateMany?: friendsUpdateManyWithWhereWithoutUsers_friends_user_idTousersInput | friendsUpdateManyWithWhereWithoutUsers_friends_user_idTousersInput[]
    deleteMany?: friendsScalarWhereInput | friendsScalarWhereInput[]
  }

  export type user_achievementsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_achievementsCreateWithoutUsersInput, user_achievementsUncheckedCreateWithoutUsersInput> | user_achievementsCreateWithoutUsersInput[] | user_achievementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_achievementsCreateOrConnectWithoutUsersInput | user_achievementsCreateOrConnectWithoutUsersInput[]
    upsert?: user_achievementsUpsertWithWhereUniqueWithoutUsersInput | user_achievementsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_achievementsCreateManyUsersInputEnvelope
    set?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    disconnect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    delete?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    connect?: user_achievementsWhereUniqueInput | user_achievementsWhereUniqueInput[]
    update?: user_achievementsUpdateWithWhereUniqueWithoutUsersInput | user_achievementsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_achievementsUpdateManyWithWhereWithoutUsersInput | user_achievementsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_achievementsScalarWhereInput | user_achievementsScalarWhereInput[]
  }

  export type xp_systemUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<xp_systemCreateWithoutUsersInput, xp_systemUncheckedCreateWithoutUsersInput> | xp_systemCreateWithoutUsersInput[] | xp_systemUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: xp_systemCreateOrConnectWithoutUsersInput | xp_systemCreateOrConnectWithoutUsersInput[]
    upsert?: xp_systemUpsertWithWhereUniqueWithoutUsersInput | xp_systemUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: xp_systemCreateManyUsersInputEnvelope
    set?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    disconnect?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    delete?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    connect?: xp_systemWhereUniqueInput | xp_systemWhereUniqueInput[]
    update?: xp_systemUpdateWithWhereUniqueWithoutUsersInput | xp_systemUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: xp_systemUpdateManyWithWhereWithoutUsersInput | xp_systemUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: xp_systemScalarWhereInput | xp_systemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountInput = {
    create?: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountInput
    connect?: UserWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutAccountNestedInput = {
    create?: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountInput
    upsert?: UserUpsertWithoutAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountInput, UserUpdateWithoutAccountInput>, UserUncheckedUpdateWithoutAccountInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type user_achievementsCreateWithoutAchievementsInput = {
    earned_at?: Date | string | null
    users: UserCreateNestedOneWithoutUser_achievementsInput
  }

  export type user_achievementsUncheckedCreateWithoutAchievementsInput = {
    user_id: string
    earned_at?: Date | string | null
  }

  export type user_achievementsCreateOrConnectWithoutAchievementsInput = {
    where: user_achievementsWhereUniqueInput
    create: XOR<user_achievementsCreateWithoutAchievementsInput, user_achievementsUncheckedCreateWithoutAchievementsInput>
  }

  export type user_achievementsCreateManyAchievementsInputEnvelope = {
    data: user_achievementsCreateManyAchievementsInput | user_achievementsCreateManyAchievementsInput[]
    skipDuplicates?: boolean
  }

  export type user_achievementsUpsertWithWhereUniqueWithoutAchievementsInput = {
    where: user_achievementsWhereUniqueInput
    update: XOR<user_achievementsUpdateWithoutAchievementsInput, user_achievementsUncheckedUpdateWithoutAchievementsInput>
    create: XOR<user_achievementsCreateWithoutAchievementsInput, user_achievementsUncheckedCreateWithoutAchievementsInput>
  }

  export type user_achievementsUpdateWithWhereUniqueWithoutAchievementsInput = {
    where: user_achievementsWhereUniqueInput
    data: XOR<user_achievementsUpdateWithoutAchievementsInput, user_achievementsUncheckedUpdateWithoutAchievementsInput>
  }

  export type user_achievementsUpdateManyWithWhereWithoutAchievementsInput = {
    where: user_achievementsScalarWhereInput
    data: XOR<user_achievementsUpdateManyMutationInput, user_achievementsUncheckedUpdateManyWithoutAchievementsInput>
  }

  export type user_achievementsScalarWhereInput = {
    AND?: user_achievementsScalarWhereInput | user_achievementsScalarWhereInput[]
    OR?: user_achievementsScalarWhereInput[]
    NOT?: user_achievementsScalarWhereInput | user_achievementsScalarWhereInput[]
    user_id?: StringFilter<"user_achievements"> | string
    achievement_id?: StringFilter<"user_achievements"> | string
    earned_at?: DateTimeNullableFilter<"user_achievements"> | Date | string | null
  }

  export type chat_sessionsCreateWithoutChat_historyInput = {
    session_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    classes: classesCreateNestedOneWithoutChat_sessionsInput
    topics: topicsCreateNestedOneWithoutChat_sessionsInput
    users: UserCreateNestedOneWithoutChat_sessionsInput
  }

  export type chat_sessionsUncheckedCreateWithoutChat_historyInput = {
    session_id: string
    class_code: string
    user_id: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
  }

  export type chat_sessionsCreateOrConnectWithoutChat_historyInput = {
    where: chat_sessionsWhereUniqueInput
    create: XOR<chat_sessionsCreateWithoutChat_historyInput, chat_sessionsUncheckedCreateWithoutChat_historyInput>
  }

  export type chat_sessionsUpsertWithoutChat_historyInput = {
    update: XOR<chat_sessionsUpdateWithoutChat_historyInput, chat_sessionsUncheckedUpdateWithoutChat_historyInput>
    create: XOR<chat_sessionsCreateWithoutChat_historyInput, chat_sessionsUncheckedCreateWithoutChat_historyInput>
    where?: chat_sessionsWhereInput
  }

  export type chat_sessionsUpdateToOneWithWhereWithoutChat_historyInput = {
    where?: chat_sessionsWhereInput
    data: XOR<chat_sessionsUpdateWithoutChat_historyInput, chat_sessionsUncheckedUpdateWithoutChat_historyInput>
  }

  export type chat_sessionsUpdateWithoutChat_historyInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    classes?: classesUpdateOneRequiredWithoutChat_sessionsNestedInput
    topics?: topicsUpdateOneRequiredWithoutChat_sessionsNestedInput
    users?: UserUpdateOneRequiredWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateWithoutChat_historyInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyCreateWithoutChat_sessionsInput = {
    id: string
    sender: string
    content: string
    created_at?: Date | string | null
  }

  export type chat_historyUncheckedCreateWithoutChat_sessionsInput = {
    id: string
    sender: string
    content: string
    created_at?: Date | string | null
  }

  export type chat_historyCreateOrConnectWithoutChat_sessionsInput = {
    where: chat_historyWhereUniqueInput
    create: XOR<chat_historyCreateWithoutChat_sessionsInput, chat_historyUncheckedCreateWithoutChat_sessionsInput>
  }

  export type chat_historyCreateManyChat_sessionsInputEnvelope = {
    data: chat_historyCreateManyChat_sessionsInput | chat_historyCreateManyChat_sessionsInput[]
    skipDuplicates?: boolean
  }

  export type classesCreateWithoutChat_sessionsInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutClassesInput
    topics?: topicsCreateNestedManyWithoutClassesInput
  }

  export type classesUncheckedCreateWithoutChat_sessionsInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutClassesInput
    topics?: topicsUncheckedCreateNestedManyWithoutClassesInput
  }

  export type classesCreateOrConnectWithoutChat_sessionsInput = {
    where: classesWhereUniqueInput
    create: XOR<classesCreateWithoutChat_sessionsInput, classesUncheckedCreateWithoutChat_sessionsInput>
  }

  export type topicsCreateWithoutChat_sessionsInput = {
    id: string
    name: string
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutTopicsInput
    classes: classesCreateNestedOneWithoutTopicsInput
  }

  export type topicsUncheckedCreateWithoutChat_sessionsInput = {
    id: string
    class_code: string
    name: string
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutTopicsInput
  }

  export type topicsCreateOrConnectWithoutChat_sessionsInput = {
    where: topicsWhereUniqueInput
    create: XOR<topicsCreateWithoutChat_sessionsInput, topicsUncheckedCreateWithoutChat_sessionsInput>
  }

  export type UserCreateWithoutChat_sessionsInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutChat_sessionsInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutChat_sessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChat_sessionsInput, UserUncheckedCreateWithoutChat_sessionsInput>
  }

  export type chat_historyUpsertWithWhereUniqueWithoutChat_sessionsInput = {
    where: chat_historyWhereUniqueInput
    update: XOR<chat_historyUpdateWithoutChat_sessionsInput, chat_historyUncheckedUpdateWithoutChat_sessionsInput>
    create: XOR<chat_historyCreateWithoutChat_sessionsInput, chat_historyUncheckedCreateWithoutChat_sessionsInput>
  }

  export type chat_historyUpdateWithWhereUniqueWithoutChat_sessionsInput = {
    where: chat_historyWhereUniqueInput
    data: XOR<chat_historyUpdateWithoutChat_sessionsInput, chat_historyUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type chat_historyUpdateManyWithWhereWithoutChat_sessionsInput = {
    where: chat_historyScalarWhereInput
    data: XOR<chat_historyUpdateManyMutationInput, chat_historyUncheckedUpdateManyWithoutChat_sessionsInput>
  }

  export type chat_historyScalarWhereInput = {
    AND?: chat_historyScalarWhereInput | chat_historyScalarWhereInput[]
    OR?: chat_historyScalarWhereInput[]
    NOT?: chat_historyScalarWhereInput | chat_historyScalarWhereInput[]
    id?: StringFilter<"chat_history"> | string
    session_id?: StringFilter<"chat_history"> | string
    sender?: StringFilter<"chat_history"> | string
    content?: StringFilter<"chat_history"> | string
    created_at?: DateTimeNullableFilter<"chat_history"> | Date | string | null
  }

  export type classesUpsertWithoutChat_sessionsInput = {
    update: XOR<classesUpdateWithoutChat_sessionsInput, classesUncheckedUpdateWithoutChat_sessionsInput>
    create: XOR<classesCreateWithoutChat_sessionsInput, classesUncheckedCreateWithoutChat_sessionsInput>
    where?: classesWhereInput
  }

  export type classesUpdateToOneWithWhereWithoutChat_sessionsInput = {
    where?: classesWhereInput
    data: XOR<classesUpdateWithoutChat_sessionsInput, classesUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type classesUpdateWithoutChat_sessionsInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutClassesNestedInput
    topics?: topicsUpdateManyWithoutClassesNestedInput
  }

  export type classesUncheckedUpdateWithoutChat_sessionsInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutClassesNestedInput
    topics?: topicsUncheckedUpdateManyWithoutClassesNestedInput
  }

  export type topicsUpsertWithoutChat_sessionsInput = {
    update: XOR<topicsUpdateWithoutChat_sessionsInput, topicsUncheckedUpdateWithoutChat_sessionsInput>
    create: XOR<topicsCreateWithoutChat_sessionsInput, topicsUncheckedCreateWithoutChat_sessionsInput>
    where?: topicsWhereInput
  }

  export type topicsUpdateToOneWithWhereWithoutChat_sessionsInput = {
    where?: topicsWhereInput
    data: XOR<topicsUpdateWithoutChat_sessionsInput, topicsUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type topicsUpdateWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutTopicsNestedInput
    classes?: classesUpdateOneRequiredWithoutTopicsNestedInput
  }

  export type topicsUncheckedUpdateWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutTopicsNestedInput
  }

  export type UserUpsertWithoutChat_sessionsInput = {
    update: XOR<UserUpdateWithoutChat_sessionsInput, UserUncheckedUpdateWithoutChat_sessionsInput>
    create: XOR<UserCreateWithoutChat_sessionsInput, UserUncheckedCreateWithoutChat_sessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChat_sessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChat_sessionsInput, UserUncheckedUpdateWithoutChat_sessionsInput>
  }

  export type UserUpdateWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type chat_sessionsCreateWithoutClassesInput = {
    session_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyCreateNestedManyWithoutChat_sessionsInput
    topics: topicsCreateNestedOneWithoutChat_sessionsInput
    users: UserCreateNestedOneWithoutChat_sessionsInput
  }

  export type chat_sessionsUncheckedCreateWithoutClassesInput = {
    session_id: string
    user_id: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyUncheckedCreateNestedManyWithoutChat_sessionsInput
  }

  export type chat_sessionsCreateOrConnectWithoutClassesInput = {
    where: chat_sessionsWhereUniqueInput
    create: XOR<chat_sessionsCreateWithoutClassesInput, chat_sessionsUncheckedCreateWithoutClassesInput>
  }

  export type chat_sessionsCreateManyClassesInputEnvelope = {
    data: chat_sessionsCreateManyClassesInput | chat_sessionsCreateManyClassesInput[]
    skipDuplicates?: boolean
  }

  export type daily_topic_metricsCreateWithoutClassesInput = {
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
    topics: topicsCreateNestedOneWithoutDaily_topic_metricsInput
    users: UserCreateNestedOneWithoutDaily_topic_metricsInput
  }

  export type daily_topic_metricsUncheckedCreateWithoutClassesInput = {
    user_id: string
    topic_id: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsCreateOrConnectWithoutClassesInput = {
    where: daily_topic_metricsWhereUniqueInput
    create: XOR<daily_topic_metricsCreateWithoutClassesInput, daily_topic_metricsUncheckedCreateWithoutClassesInput>
  }

  export type daily_topic_metricsCreateManyClassesInputEnvelope = {
    data: daily_topic_metricsCreateManyClassesInput | daily_topic_metricsCreateManyClassesInput[]
    skipDuplicates?: boolean
  }

  export type topicsCreateWithoutClassesInput = {
    id: string
    name: string
    chat_sessions?: chat_sessionsCreateNestedManyWithoutTopicsInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutTopicsInput
  }

  export type topicsUncheckedCreateWithoutClassesInput = {
    id: string
    name: string
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutTopicsInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutTopicsInput
  }

  export type topicsCreateOrConnectWithoutClassesInput = {
    where: topicsWhereUniqueInput
    create: XOR<topicsCreateWithoutClassesInput, topicsUncheckedCreateWithoutClassesInput>
  }

  export type topicsCreateManyClassesInputEnvelope = {
    data: topicsCreateManyClassesInput | topicsCreateManyClassesInput[]
    skipDuplicates?: boolean
  }

  export type chat_sessionsUpsertWithWhereUniqueWithoutClassesInput = {
    where: chat_sessionsWhereUniqueInput
    update: XOR<chat_sessionsUpdateWithoutClassesInput, chat_sessionsUncheckedUpdateWithoutClassesInput>
    create: XOR<chat_sessionsCreateWithoutClassesInput, chat_sessionsUncheckedCreateWithoutClassesInput>
  }

  export type chat_sessionsUpdateWithWhereUniqueWithoutClassesInput = {
    where: chat_sessionsWhereUniqueInput
    data: XOR<chat_sessionsUpdateWithoutClassesInput, chat_sessionsUncheckedUpdateWithoutClassesInput>
  }

  export type chat_sessionsUpdateManyWithWhereWithoutClassesInput = {
    where: chat_sessionsScalarWhereInput
    data: XOR<chat_sessionsUpdateManyMutationInput, chat_sessionsUncheckedUpdateManyWithoutClassesInput>
  }

  export type chat_sessionsScalarWhereInput = {
    AND?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
    OR?: chat_sessionsScalarWhereInput[]
    NOT?: chat_sessionsScalarWhereInput | chat_sessionsScalarWhereInput[]
    session_id?: StringFilter<"chat_sessions"> | string
    class_code?: StringFilter<"chat_sessions"> | string
    user_id?: StringFilter<"chat_sessions"> | string
    topic_id?: StringFilter<"chat_sessions"> | string
    started_at?: DateTimeNullableFilter<"chat_sessions"> | Date | string | null
    created_at?: DateTimeNullableFilter<"chat_sessions"> | Date | string | null
  }

  export type daily_topic_metricsUpsertWithWhereUniqueWithoutClassesInput = {
    where: daily_topic_metricsWhereUniqueInput
    update: XOR<daily_topic_metricsUpdateWithoutClassesInput, daily_topic_metricsUncheckedUpdateWithoutClassesInput>
    create: XOR<daily_topic_metricsCreateWithoutClassesInput, daily_topic_metricsUncheckedCreateWithoutClassesInput>
  }

  export type daily_topic_metricsUpdateWithWhereUniqueWithoutClassesInput = {
    where: daily_topic_metricsWhereUniqueInput
    data: XOR<daily_topic_metricsUpdateWithoutClassesInput, daily_topic_metricsUncheckedUpdateWithoutClassesInput>
  }

  export type daily_topic_metricsUpdateManyWithWhereWithoutClassesInput = {
    where: daily_topic_metricsScalarWhereInput
    data: XOR<daily_topic_metricsUpdateManyMutationInput, daily_topic_metricsUncheckedUpdateManyWithoutClassesInput>
  }

  export type daily_topic_metricsScalarWhereInput = {
    AND?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
    OR?: daily_topic_metricsScalarWhereInput[]
    NOT?: daily_topic_metricsScalarWhereInput | daily_topic_metricsScalarWhereInput[]
    user_id?: StringFilter<"daily_topic_metrics"> | string
    class_code?: StringFilter<"daily_topic_metrics"> | string
    topic_id?: StringFilter<"daily_topic_metrics"> | string
    metric_date?: DateTimeFilter<"daily_topic_metrics"> | Date | string
    avg_score?: DecimalNullableFilter<"daily_topic_metrics"> | Decimal | DecimalJsLike | number | string | null
  }

  export type topicsUpsertWithWhereUniqueWithoutClassesInput = {
    where: topicsWhereUniqueInput
    update: XOR<topicsUpdateWithoutClassesInput, topicsUncheckedUpdateWithoutClassesInput>
    create: XOR<topicsCreateWithoutClassesInput, topicsUncheckedCreateWithoutClassesInput>
  }

  export type topicsUpdateWithWhereUniqueWithoutClassesInput = {
    where: topicsWhereUniqueInput
    data: XOR<topicsUpdateWithoutClassesInput, topicsUncheckedUpdateWithoutClassesInput>
  }

  export type topicsUpdateManyWithWhereWithoutClassesInput = {
    where: topicsScalarWhereInput
    data: XOR<topicsUpdateManyMutationInput, topicsUncheckedUpdateManyWithoutClassesInput>
  }

  export type topicsScalarWhereInput = {
    AND?: topicsScalarWhereInput | topicsScalarWhereInput[]
    OR?: topicsScalarWhereInput[]
    NOT?: topicsScalarWhereInput | topicsScalarWhereInput[]
    id?: StringFilter<"topics"> | string
    class_code?: StringFilter<"topics"> | string
    name?: StringFilter<"topics"> | string
  }

  export type classesCreateWithoutDaily_topic_metricsInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    chat_sessions?: chat_sessionsCreateNestedManyWithoutClassesInput
    topics?: topicsCreateNestedManyWithoutClassesInput
  }

  export type classesUncheckedCreateWithoutDaily_topic_metricsInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutClassesInput
    topics?: topicsUncheckedCreateNestedManyWithoutClassesInput
  }

  export type classesCreateOrConnectWithoutDaily_topic_metricsInput = {
    where: classesWhereUniqueInput
    create: XOR<classesCreateWithoutDaily_topic_metricsInput, classesUncheckedCreateWithoutDaily_topic_metricsInput>
  }

  export type topicsCreateWithoutDaily_topic_metricsInput = {
    id: string
    name: string
    chat_sessions?: chat_sessionsCreateNestedManyWithoutTopicsInput
    classes: classesCreateNestedOneWithoutTopicsInput
  }

  export type topicsUncheckedCreateWithoutDaily_topic_metricsInput = {
    id: string
    class_code: string
    name: string
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutTopicsInput
  }

  export type topicsCreateOrConnectWithoutDaily_topic_metricsInput = {
    where: topicsWhereUniqueInput
    create: XOR<topicsCreateWithoutDaily_topic_metricsInput, topicsUncheckedCreateWithoutDaily_topic_metricsInput>
  }

  export type UserCreateWithoutDaily_topic_metricsInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutDaily_topic_metricsInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutDaily_topic_metricsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDaily_topic_metricsInput, UserUncheckedCreateWithoutDaily_topic_metricsInput>
  }

  export type classesUpsertWithoutDaily_topic_metricsInput = {
    update: XOR<classesUpdateWithoutDaily_topic_metricsInput, classesUncheckedUpdateWithoutDaily_topic_metricsInput>
    create: XOR<classesCreateWithoutDaily_topic_metricsInput, classesUncheckedCreateWithoutDaily_topic_metricsInput>
    where?: classesWhereInput
  }

  export type classesUpdateToOneWithWhereWithoutDaily_topic_metricsInput = {
    where?: classesWhereInput
    data: XOR<classesUpdateWithoutDaily_topic_metricsInput, classesUncheckedUpdateWithoutDaily_topic_metricsInput>
  }

  export type classesUpdateWithoutDaily_topic_metricsInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    chat_sessions?: chat_sessionsUpdateManyWithoutClassesNestedInput
    topics?: topicsUpdateManyWithoutClassesNestedInput
  }

  export type classesUncheckedUpdateWithoutDaily_topic_metricsInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutClassesNestedInput
    topics?: topicsUncheckedUpdateManyWithoutClassesNestedInput
  }

  export type topicsUpsertWithoutDaily_topic_metricsInput = {
    update: XOR<topicsUpdateWithoutDaily_topic_metricsInput, topicsUncheckedUpdateWithoutDaily_topic_metricsInput>
    create: XOR<topicsCreateWithoutDaily_topic_metricsInput, topicsUncheckedCreateWithoutDaily_topic_metricsInput>
    where?: topicsWhereInput
  }

  export type topicsUpdateToOneWithWhereWithoutDaily_topic_metricsInput = {
    where?: topicsWhereInput
    data: XOR<topicsUpdateWithoutDaily_topic_metricsInput, topicsUncheckedUpdateWithoutDaily_topic_metricsInput>
  }

  export type topicsUpdateWithoutDaily_topic_metricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chat_sessions?: chat_sessionsUpdateManyWithoutTopicsNestedInput
    classes?: classesUpdateOneRequiredWithoutTopicsNestedInput
  }

  export type topicsUncheckedUpdateWithoutDaily_topic_metricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutTopicsNestedInput
  }

  export type UserUpsertWithoutDaily_topic_metricsInput = {
    update: XOR<UserUpdateWithoutDaily_topic_metricsInput, UserUncheckedUpdateWithoutDaily_topic_metricsInput>
    create: XOR<UserCreateWithoutDaily_topic_metricsInput, UserUncheckedCreateWithoutDaily_topic_metricsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDaily_topic_metricsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDaily_topic_metricsInput, UserUncheckedUpdateWithoutDaily_topic_metricsInput>
  }

  export type UserUpdateWithoutDaily_topic_metricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutDaily_topic_metricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
  }

  export type UserCreateWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_sender_idTousersInput>
  }

  export type UserUpsertWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    update: XOR<UserUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUncheckedUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
    create: XOR<UserCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput, UserUncheckedUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput>
  }

  export type UserUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutFriend_requests_friend_requests_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserUpsertWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    update: XOR<UserUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUncheckedUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput>
    create: XOR<UserCreateWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUncheckedCreateWithoutFriend_requests_friend_requests_sender_idTousersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput, UserUncheckedUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput>
  }

  export type UserUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutFriend_requests_friend_requests_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateWithoutFriends_friends_friend_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutFriends_friends_friend_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutFriends_friends_friend_idTousersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriends_friends_friend_idTousersInput, UserUncheckedCreateWithoutFriends_friends_friend_idTousersInput>
  }

  export type UserCreateWithoutFriends_friends_user_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutFriends_friends_user_idTousersInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutFriends_friends_user_idTousersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriends_friends_user_idTousersInput, UserUncheckedCreateWithoutFriends_friends_user_idTousersInput>
  }

  export type UserUpsertWithoutFriends_friends_friend_idTousersInput = {
    update: XOR<UserUpdateWithoutFriends_friends_friend_idTousersInput, UserUncheckedUpdateWithoutFriends_friends_friend_idTousersInput>
    create: XOR<UserCreateWithoutFriends_friends_friend_idTousersInput, UserUncheckedCreateWithoutFriends_friends_friend_idTousersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriends_friends_friend_idTousersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriends_friends_friend_idTousersInput, UserUncheckedUpdateWithoutFriends_friends_friend_idTousersInput>
  }

  export type UserUpdateWithoutFriends_friends_friend_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutFriends_friends_friend_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserUpsertWithoutFriends_friends_user_idTousersInput = {
    update: XOR<UserUpdateWithoutFriends_friends_user_idTousersInput, UserUncheckedUpdateWithoutFriends_friends_user_idTousersInput>
    create: XOR<UserCreateWithoutFriends_friends_user_idTousersInput, UserUncheckedCreateWithoutFriends_friends_user_idTousersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriends_friends_user_idTousersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriends_friends_user_idTousersInput, UserUncheckedUpdateWithoutFriends_friends_user_idTousersInput>
  }

  export type UserUpdateWithoutFriends_friends_user_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutFriends_friends_user_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type chat_sessionsCreateWithoutTopicsInput = {
    session_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyCreateNestedManyWithoutChat_sessionsInput
    classes: classesCreateNestedOneWithoutChat_sessionsInput
    users: UserCreateNestedOneWithoutChat_sessionsInput
  }

  export type chat_sessionsUncheckedCreateWithoutTopicsInput = {
    session_id: string
    class_code: string
    user_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyUncheckedCreateNestedManyWithoutChat_sessionsInput
  }

  export type chat_sessionsCreateOrConnectWithoutTopicsInput = {
    where: chat_sessionsWhereUniqueInput
    create: XOR<chat_sessionsCreateWithoutTopicsInput, chat_sessionsUncheckedCreateWithoutTopicsInput>
  }

  export type chat_sessionsCreateManyTopicsInputEnvelope = {
    data: chat_sessionsCreateManyTopicsInput | chat_sessionsCreateManyTopicsInput[]
    skipDuplicates?: boolean
  }

  export type daily_topic_metricsCreateWithoutTopicsInput = {
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
    classes: classesCreateNestedOneWithoutDaily_topic_metricsInput
    users: UserCreateNestedOneWithoutDaily_topic_metricsInput
  }

  export type daily_topic_metricsUncheckedCreateWithoutTopicsInput = {
    user_id: string
    class_code: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsCreateOrConnectWithoutTopicsInput = {
    where: daily_topic_metricsWhereUniqueInput
    create: XOR<daily_topic_metricsCreateWithoutTopicsInput, daily_topic_metricsUncheckedCreateWithoutTopicsInput>
  }

  export type daily_topic_metricsCreateManyTopicsInputEnvelope = {
    data: daily_topic_metricsCreateManyTopicsInput | daily_topic_metricsCreateManyTopicsInput[]
    skipDuplicates?: boolean
  }

  export type classesCreateWithoutTopicsInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    chat_sessions?: chat_sessionsCreateNestedManyWithoutClassesInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutClassesInput
  }

  export type classesUncheckedCreateWithoutTopicsInput = {
    class_code: string
    subject: string
    name: string
    created_at?: Date | string | null
    user_id?: string | null
    syllabus_url?: string | null
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutClassesInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutClassesInput
  }

  export type classesCreateOrConnectWithoutTopicsInput = {
    where: classesWhereUniqueInput
    create: XOR<classesCreateWithoutTopicsInput, classesUncheckedCreateWithoutTopicsInput>
  }

  export type chat_sessionsUpsertWithWhereUniqueWithoutTopicsInput = {
    where: chat_sessionsWhereUniqueInput
    update: XOR<chat_sessionsUpdateWithoutTopicsInput, chat_sessionsUncheckedUpdateWithoutTopicsInput>
    create: XOR<chat_sessionsCreateWithoutTopicsInput, chat_sessionsUncheckedCreateWithoutTopicsInput>
  }

  export type chat_sessionsUpdateWithWhereUniqueWithoutTopicsInput = {
    where: chat_sessionsWhereUniqueInput
    data: XOR<chat_sessionsUpdateWithoutTopicsInput, chat_sessionsUncheckedUpdateWithoutTopicsInput>
  }

  export type chat_sessionsUpdateManyWithWhereWithoutTopicsInput = {
    where: chat_sessionsScalarWhereInput
    data: XOR<chat_sessionsUpdateManyMutationInput, chat_sessionsUncheckedUpdateManyWithoutTopicsInput>
  }

  export type daily_topic_metricsUpsertWithWhereUniqueWithoutTopicsInput = {
    where: daily_topic_metricsWhereUniqueInput
    update: XOR<daily_topic_metricsUpdateWithoutTopicsInput, daily_topic_metricsUncheckedUpdateWithoutTopicsInput>
    create: XOR<daily_topic_metricsCreateWithoutTopicsInput, daily_topic_metricsUncheckedCreateWithoutTopicsInput>
  }

  export type daily_topic_metricsUpdateWithWhereUniqueWithoutTopicsInput = {
    where: daily_topic_metricsWhereUniqueInput
    data: XOR<daily_topic_metricsUpdateWithoutTopicsInput, daily_topic_metricsUncheckedUpdateWithoutTopicsInput>
  }

  export type daily_topic_metricsUpdateManyWithWhereWithoutTopicsInput = {
    where: daily_topic_metricsScalarWhereInput
    data: XOR<daily_topic_metricsUpdateManyMutationInput, daily_topic_metricsUncheckedUpdateManyWithoutTopicsInput>
  }

  export type classesUpsertWithoutTopicsInput = {
    update: XOR<classesUpdateWithoutTopicsInput, classesUncheckedUpdateWithoutTopicsInput>
    create: XOR<classesCreateWithoutTopicsInput, classesUncheckedCreateWithoutTopicsInput>
    where?: classesWhereInput
  }

  export type classesUpdateToOneWithWhereWithoutTopicsInput = {
    where?: classesWhereInput
    data: XOR<classesUpdateWithoutTopicsInput, classesUncheckedUpdateWithoutTopicsInput>
  }

  export type classesUpdateWithoutTopicsInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    chat_sessions?: chat_sessionsUpdateManyWithoutClassesNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutClassesNestedInput
  }

  export type classesUncheckedUpdateWithoutTopicsInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    syllabus_url?: NullableStringFieldUpdateOperationsInput | string | null
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutClassesNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutClassesNestedInput
  }

  export type achievementsCreateWithoutUser_achievementsInput = {
    id: string
    name: string
    description?: string | null
    xp_reward?: number | null
    created_at?: Date | string | null
  }

  export type achievementsUncheckedCreateWithoutUser_achievementsInput = {
    id: string
    name: string
    description?: string | null
    xp_reward?: number | null
    created_at?: Date | string | null
  }

  export type achievementsCreateOrConnectWithoutUser_achievementsInput = {
    where: achievementsWhereUniqueInput
    create: XOR<achievementsCreateWithoutUser_achievementsInput, achievementsUncheckedCreateWithoutUser_achievementsInput>
  }

  export type UserCreateWithoutUser_achievementsInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutUser_achievementsInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutUser_achievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUser_achievementsInput, UserUncheckedCreateWithoutUser_achievementsInput>
  }

  export type achievementsUpsertWithoutUser_achievementsInput = {
    update: XOR<achievementsUpdateWithoutUser_achievementsInput, achievementsUncheckedUpdateWithoutUser_achievementsInput>
    create: XOR<achievementsCreateWithoutUser_achievementsInput, achievementsUncheckedCreateWithoutUser_achievementsInput>
    where?: achievementsWhereInput
  }

  export type achievementsUpdateToOneWithWhereWithoutUser_achievementsInput = {
    where?: achievementsWhereInput
    data: XOR<achievementsUpdateWithoutUser_achievementsInput, achievementsUncheckedUpdateWithoutUser_achievementsInput>
  }

  export type achievementsUpdateWithoutUser_achievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_reward?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type achievementsUncheckedUpdateWithoutUser_achievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_reward?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutUser_achievementsInput = {
    update: XOR<UserUpdateWithoutUser_achievementsInput, UserUncheckedUpdateWithoutUser_achievementsInput>
    create: XOR<UserCreateWithoutUser_achievementsInput, UserUncheckedCreateWithoutUser_achievementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUser_achievementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUser_achievementsInput, UserUncheckedUpdateWithoutUser_achievementsInput>
  }

  export type UserUpdateWithoutUser_achievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutUser_achievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateWithoutXp_systemInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutXp_systemInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    Account?: AccountUncheckedCreateNestedManyWithoutUserInput
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutXp_systemInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutXp_systemInput, UserUncheckedCreateWithoutXp_systemInput>
  }

  export type UserUpsertWithoutXp_systemInput = {
    update: XOR<UserUpdateWithoutXp_systemInput, UserUncheckedUpdateWithoutXp_systemInput>
    create: XOR<UserCreateWithoutXp_systemInput, UserUncheckedCreateWithoutXp_systemInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutXp_systemInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutXp_systemInput, UserUncheckedUpdateWithoutXp_systemInput>
  }

  export type UserUpdateWithoutXp_systemInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutXp_systemInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    Account?: AccountUncheckedUpdateManyWithoutUserNestedInput
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: bigint | number | null
    type?: string | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    refresh_token_expires_in?: number | null
    updatedat?: Date | string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: bigint | number | null
    type?: string | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    refresh_token_expires_in?: number | null
    updatedat?: Date | string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type chat_sessionsCreateWithoutUsersInput = {
    session_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyCreateNestedManyWithoutChat_sessionsInput
    classes: classesCreateNestedOneWithoutChat_sessionsInput
    topics: topicsCreateNestedOneWithoutChat_sessionsInput
  }

  export type chat_sessionsUncheckedCreateWithoutUsersInput = {
    session_id: string
    class_code: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
    chat_history?: chat_historyUncheckedCreateNestedManyWithoutChat_sessionsInput
  }

  export type chat_sessionsCreateOrConnectWithoutUsersInput = {
    where: chat_sessionsWhereUniqueInput
    create: XOR<chat_sessionsCreateWithoutUsersInput, chat_sessionsUncheckedCreateWithoutUsersInput>
  }

  export type chat_sessionsCreateManyUsersInputEnvelope = {
    data: chat_sessionsCreateManyUsersInput | chat_sessionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type daily_topic_metricsCreateWithoutUsersInput = {
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
    classes: classesCreateNestedOneWithoutDaily_topic_metricsInput
    topics: topicsCreateNestedOneWithoutDaily_topic_metricsInput
  }

  export type daily_topic_metricsUncheckedCreateWithoutUsersInput = {
    class_code: string
    topic_id: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsCreateOrConnectWithoutUsersInput = {
    where: daily_topic_metricsWhereUniqueInput
    create: XOR<daily_topic_metricsCreateWithoutUsersInput, daily_topic_metricsUncheckedCreateWithoutUsersInput>
  }

  export type daily_topic_metricsCreateManyUsersInputEnvelope = {
    data: daily_topic_metricsCreateManyUsersInput | daily_topic_metricsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput = {
    id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
    users_friend_requests_sender_idTousers: UserCreateNestedOneWithoutFriend_requests_friend_requests_sender_idTousersInput
  }

  export type friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput = {
    id: string
    sender_id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
  }

  export type friend_requestsCreateOrConnectWithoutUsers_friend_requests_receiver_idTousersInput = {
    where: friend_requestsWhereUniqueInput
    create: XOR<friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput>
  }

  export type friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInputEnvelope = {
    data: friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInput | friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput = {
    id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
    users_friend_requests_receiver_idTousers: UserCreateNestedOneWithoutFriend_requests_friend_requests_receiver_idTousersInput
  }

  export type friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput = {
    id: string
    receiver_id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
  }

  export type friend_requestsCreateOrConnectWithoutUsers_friend_requests_sender_idTousersInput = {
    where: friend_requestsWhereUniqueInput
    create: XOR<friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput>
  }

  export type friend_requestsCreateManyUsers_friend_requests_sender_idTousersInputEnvelope = {
    data: friend_requestsCreateManyUsers_friend_requests_sender_idTousersInput | friend_requestsCreateManyUsers_friend_requests_sender_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type friendsCreateWithoutUsers_friends_friend_idTousersInput = {
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
    users_friends_user_idTousers: UserCreateNestedOneWithoutFriends_friends_user_idTousersInput
  }

  export type friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput = {
    user_id: string
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
  }

  export type friendsCreateOrConnectWithoutUsers_friends_friend_idTousersInput = {
    where: friendsWhereUniqueInput
    create: XOR<friendsCreateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput>
  }

  export type friendsCreateManyUsers_friends_friend_idTousersInputEnvelope = {
    data: friendsCreateManyUsers_friends_friend_idTousersInput | friendsCreateManyUsers_friends_friend_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type friendsCreateWithoutUsers_friends_user_idTousersInput = {
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
    users_friends_friend_idTousers: UserCreateNestedOneWithoutFriends_friends_friend_idTousersInput
  }

  export type friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput = {
    friend_id: string
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
  }

  export type friendsCreateOrConnectWithoutUsers_friends_user_idTousersInput = {
    where: friendsWhereUniqueInput
    create: XOR<friendsCreateWithoutUsers_friends_user_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput>
  }

  export type friendsCreateManyUsers_friends_user_idTousersInputEnvelope = {
    data: friendsCreateManyUsers_friends_user_idTousersInput | friendsCreateManyUsers_friends_user_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type user_achievementsCreateWithoutUsersInput = {
    earned_at?: Date | string | null
    achievements: achievementsCreateNestedOneWithoutUser_achievementsInput
  }

  export type user_achievementsUncheckedCreateWithoutUsersInput = {
    achievement_id: string
    earned_at?: Date | string | null
  }

  export type user_achievementsCreateOrConnectWithoutUsersInput = {
    where: user_achievementsWhereUniqueInput
    create: XOR<user_achievementsCreateWithoutUsersInput, user_achievementsUncheckedCreateWithoutUsersInput>
  }

  export type user_achievementsCreateManyUsersInputEnvelope = {
    data: user_achievementsCreateManyUsersInput | user_achievementsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type xp_systemCreateWithoutUsersInput = {
    id: string
    source: string
    amount: number
    created_at?: Date | string | null
  }

  export type xp_systemUncheckedCreateWithoutUsersInput = {
    id: string
    source: string
    amount: number
    created_at?: Date | string | null
  }

  export type xp_systemCreateOrConnectWithoutUsersInput = {
    where: xp_systemWhereUniqueInput
    create: XOR<xp_systemCreateWithoutUsersInput, xp_systemUncheckedCreateWithoutUsersInput>
  }

  export type xp_systemCreateManyUsersInputEnvelope = {
    data: xp_systemCreateManyUsersInput | xp_systemCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    userId?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    access_token?: StringNullableFilter<"Account"> | string | null
    refresh_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: BigIntNullableFilter<"Account"> | bigint | number | null
    type?: StringNullableFilter<"Account"> | string | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    updatedat?: DateTimeNullableFilter<"Account"> | Date | string | null
  }

  export type chat_sessionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: chat_sessionsWhereUniqueInput
    update: XOR<chat_sessionsUpdateWithoutUsersInput, chat_sessionsUncheckedUpdateWithoutUsersInput>
    create: XOR<chat_sessionsCreateWithoutUsersInput, chat_sessionsUncheckedCreateWithoutUsersInput>
  }

  export type chat_sessionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: chat_sessionsWhereUniqueInput
    data: XOR<chat_sessionsUpdateWithoutUsersInput, chat_sessionsUncheckedUpdateWithoutUsersInput>
  }

  export type chat_sessionsUpdateManyWithWhereWithoutUsersInput = {
    where: chat_sessionsScalarWhereInput
    data: XOR<chat_sessionsUpdateManyMutationInput, chat_sessionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type daily_topic_metricsUpsertWithWhereUniqueWithoutUsersInput = {
    where: daily_topic_metricsWhereUniqueInput
    update: XOR<daily_topic_metricsUpdateWithoutUsersInput, daily_topic_metricsUncheckedUpdateWithoutUsersInput>
    create: XOR<daily_topic_metricsCreateWithoutUsersInput, daily_topic_metricsUncheckedCreateWithoutUsersInput>
  }

  export type daily_topic_metricsUpdateWithWhereUniqueWithoutUsersInput = {
    where: daily_topic_metricsWhereUniqueInput
    data: XOR<daily_topic_metricsUpdateWithoutUsersInput, daily_topic_metricsUncheckedUpdateWithoutUsersInput>
  }

  export type daily_topic_metricsUpdateManyWithWhereWithoutUsersInput = {
    where: daily_topic_metricsScalarWhereInput
    data: XOR<daily_topic_metricsUpdateManyMutationInput, daily_topic_metricsUncheckedUpdateManyWithoutUsersInput>
  }

  export type friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput = {
    where: friend_requestsWhereUniqueInput
    update: XOR<friend_requestsUpdateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedUpdateWithoutUsers_friend_requests_receiver_idTousersInput>
    create: XOR<friend_requestsCreateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_receiver_idTousersInput>
  }

  export type friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_receiver_idTousersInput = {
    where: friend_requestsWhereUniqueInput
    data: XOR<friend_requestsUpdateWithoutUsers_friend_requests_receiver_idTousersInput, friend_requestsUncheckedUpdateWithoutUsers_friend_requests_receiver_idTousersInput>
  }

  export type friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_receiver_idTousersInput = {
    where: friend_requestsScalarWhereInput
    data: XOR<friend_requestsUpdateManyMutationInput, friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersInput>
  }

  export type friend_requestsScalarWhereInput = {
    AND?: friend_requestsScalarWhereInput | friend_requestsScalarWhereInput[]
    OR?: friend_requestsScalarWhereInput[]
    NOT?: friend_requestsScalarWhereInput | friend_requestsScalarWhereInput[]
    id?: StringFilter<"friend_requests"> | string
    sender_id?: StringFilter<"friend_requests"> | string
    receiver_id?: StringFilter<"friend_requests"> | string
    status?: StringFilter<"friend_requests"> | string
    created_at?: DateTimeNullableFilter<"friend_requests"> | Date | string | null
    responded_at?: DateTimeNullableFilter<"friend_requests"> | Date | string | null
  }

  export type friend_requestsUpsertWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput = {
    where: friend_requestsWhereUniqueInput
    update: XOR<friend_requestsUpdateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedUpdateWithoutUsers_friend_requests_sender_idTousersInput>
    create: XOR<friend_requestsCreateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedCreateWithoutUsers_friend_requests_sender_idTousersInput>
  }

  export type friend_requestsUpdateWithWhereUniqueWithoutUsers_friend_requests_sender_idTousersInput = {
    where: friend_requestsWhereUniqueInput
    data: XOR<friend_requestsUpdateWithoutUsers_friend_requests_sender_idTousersInput, friend_requestsUncheckedUpdateWithoutUsers_friend_requests_sender_idTousersInput>
  }

  export type friend_requestsUpdateManyWithWhereWithoutUsers_friend_requests_sender_idTousersInput = {
    where: friend_requestsScalarWhereInput
    data: XOR<friend_requestsUpdateManyMutationInput, friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersInput>
  }

  export type friendsUpsertWithWhereUniqueWithoutUsers_friends_friend_idTousersInput = {
    where: friendsWhereUniqueInput
    update: XOR<friendsUpdateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedUpdateWithoutUsers_friends_friend_idTousersInput>
    create: XOR<friendsCreateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_friend_idTousersInput>
  }

  export type friendsUpdateWithWhereUniqueWithoutUsers_friends_friend_idTousersInput = {
    where: friendsWhereUniqueInput
    data: XOR<friendsUpdateWithoutUsers_friends_friend_idTousersInput, friendsUncheckedUpdateWithoutUsers_friends_friend_idTousersInput>
  }

  export type friendsUpdateManyWithWhereWithoutUsers_friends_friend_idTousersInput = {
    where: friendsScalarWhereInput
    data: XOR<friendsUpdateManyMutationInput, friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersInput>
  }

  export type friendsScalarWhereInput = {
    AND?: friendsScalarWhereInput | friendsScalarWhereInput[]
    OR?: friendsScalarWhereInput[]
    NOT?: friendsScalarWhereInput | friendsScalarWhereInput[]
    user_id?: StringFilter<"friends"> | string
    friend_id?: StringFilter<"friends"> | string
    created_at?: DateTimeNullableFilter<"friends"> | Date | string | null
    streak?: IntNullableFilter<"friends"> | number | null
    total_xp?: IntNullableFilter<"friends"> | number | null
  }

  export type friendsUpsertWithWhereUniqueWithoutUsers_friends_user_idTousersInput = {
    where: friendsWhereUniqueInput
    update: XOR<friendsUpdateWithoutUsers_friends_user_idTousersInput, friendsUncheckedUpdateWithoutUsers_friends_user_idTousersInput>
    create: XOR<friendsCreateWithoutUsers_friends_user_idTousersInput, friendsUncheckedCreateWithoutUsers_friends_user_idTousersInput>
  }

  export type friendsUpdateWithWhereUniqueWithoutUsers_friends_user_idTousersInput = {
    where: friendsWhereUniqueInput
    data: XOR<friendsUpdateWithoutUsers_friends_user_idTousersInput, friendsUncheckedUpdateWithoutUsers_friends_user_idTousersInput>
  }

  export type friendsUpdateManyWithWhereWithoutUsers_friends_user_idTousersInput = {
    where: friendsScalarWhereInput
    data: XOR<friendsUpdateManyMutationInput, friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersInput>
  }

  export type user_achievementsUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_achievementsWhereUniqueInput
    update: XOR<user_achievementsUpdateWithoutUsersInput, user_achievementsUncheckedUpdateWithoutUsersInput>
    create: XOR<user_achievementsCreateWithoutUsersInput, user_achievementsUncheckedCreateWithoutUsersInput>
  }

  export type user_achievementsUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_achievementsWhereUniqueInput
    data: XOR<user_achievementsUpdateWithoutUsersInput, user_achievementsUncheckedUpdateWithoutUsersInput>
  }

  export type user_achievementsUpdateManyWithWhereWithoutUsersInput = {
    where: user_achievementsScalarWhereInput
    data: XOR<user_achievementsUpdateManyMutationInput, user_achievementsUncheckedUpdateManyWithoutUsersInput>
  }

  export type xp_systemUpsertWithWhereUniqueWithoutUsersInput = {
    where: xp_systemWhereUniqueInput
    update: XOR<xp_systemUpdateWithoutUsersInput, xp_systemUncheckedUpdateWithoutUsersInput>
    create: XOR<xp_systemCreateWithoutUsersInput, xp_systemUncheckedCreateWithoutUsersInput>
  }

  export type xp_systemUpdateWithWhereUniqueWithoutUsersInput = {
    where: xp_systemWhereUniqueInput
    data: XOR<xp_systemUpdateWithoutUsersInput, xp_systemUncheckedUpdateWithoutUsersInput>
  }

  export type xp_systemUpdateManyWithWhereWithoutUsersInput = {
    where: xp_systemScalarWhereInput
    data: XOR<xp_systemUpdateManyMutationInput, xp_systemUncheckedUpdateManyWithoutUsersInput>
  }

  export type xp_systemScalarWhereInput = {
    AND?: xp_systemScalarWhereInput | xp_systemScalarWhereInput[]
    OR?: xp_systemScalarWhereInput[]
    NOT?: xp_systemScalarWhereInput | xp_systemScalarWhereInput[]
    id?: StringFilter<"xp_system"> | string
    user_id?: StringFilter<"xp_system"> | string
    source?: StringFilter<"xp_system"> | string
    amount?: IntFilter<"xp_system"> | number
    created_at?: DateTimeNullableFilter<"xp_system"> | Date | string | null
  }

  export type UserCreateWithoutAccountInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    chat_sessions?: chat_sessionsCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutAccountInput = {
    id?: string
    email: string
    total_xp?: number | null
    image?: string | null
    emailVerified?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    name?: string | null
    first_name?: string | null
    last_name?: string | null
    school?: string | null
    major?: string | null
    class_status?: string | null
    streak?: number | null
    weekly_xp?: number | null
    chat_sessions?: chat_sessionsUncheckedCreateNestedManyWithoutUsersInput
    daily_topic_metrics?: daily_topic_metricsUncheckedCreateNestedManyWithoutUsersInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_receiver_idTousersInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedCreateNestedManyWithoutUsers_friend_requests_sender_idTousersInput
    friends_friends_friend_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_friend_idTousersInput
    friends_friends_user_idTousers?: friendsUncheckedCreateNestedManyWithoutUsers_friends_user_idTousersInput
    user_achievements?: user_achievementsUncheckedCreateNestedManyWithoutUsersInput
    xp_system?: xp_systemUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
  }

  export type UserUpsertWithoutAccountInput = {
    update: XOR<UserUpdateWithoutAccountInput, UserUncheckedUpdateWithoutAccountInput>
    create: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountInput, UserUncheckedUpdateWithoutAccountInput>
  }

  export type UserUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    chat_sessions?: chat_sessionsUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    major?: NullableStringFieldUpdateOperationsInput | string | null
    class_status?: NullableStringFieldUpdateOperationsInput | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    weekly_xp?: NullableIntFieldUpdateOperationsInput | number | null
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutUsersNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutUsersNestedInput
    friend_requests_friend_requests_receiver_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersNestedInput
    friend_requests_friend_requests_sender_idTousers?: friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersNestedInput
    friends_friends_friend_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersNestedInput
    friends_friends_user_idTousers?: friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersNestedInput
    user_achievements?: user_achievementsUncheckedUpdateManyWithoutUsersNestedInput
    xp_system?: xp_systemUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type user_achievementsCreateManyAchievementsInput = {
    user_id: string
    earned_at?: Date | string | null
  }

  export type user_achievementsUpdateWithoutAchievementsInput = {
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateOneRequiredWithoutUser_achievementsNestedInput
  }

  export type user_achievementsUncheckedUpdateWithoutAchievementsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_achievementsUncheckedUpdateManyWithoutAchievementsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyCreateManyChat_sessionsInput = {
    id: string
    sender: string
    content: string
    created_at?: Date | string | null
  }

  export type chat_historyUpdateWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyUncheckedUpdateWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_historyUncheckedUpdateManyWithoutChat_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_sessionsCreateManyClassesInput = {
    session_id: string
    user_id: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
  }

  export type daily_topic_metricsCreateManyClassesInput = {
    user_id: string
    topic_id: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type topicsCreateManyClassesInput = {
    id: string
    name: string
  }

  export type chat_sessionsUpdateWithoutClassesInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUpdateManyWithoutChat_sessionsNestedInput
    topics?: topicsUpdateOneRequiredWithoutChat_sessionsNestedInput
    users?: UserUpdateOneRequiredWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateWithoutClassesInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUncheckedUpdateManyWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateManyWithoutClassesInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type daily_topic_metricsUpdateWithoutClassesInput = {
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    topics?: topicsUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
    users?: UserUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
  }

  export type daily_topic_metricsUncheckedUpdateWithoutClassesInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUncheckedUpdateManyWithoutClassesInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type topicsUpdateWithoutClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chat_sessions?: chat_sessionsUpdateManyWithoutTopicsNestedInput
    daily_topic_metrics?: daily_topic_metricsUpdateManyWithoutTopicsNestedInput
  }

  export type topicsUncheckedUpdateWithoutClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    chat_sessions?: chat_sessionsUncheckedUpdateManyWithoutTopicsNestedInput
    daily_topic_metrics?: daily_topic_metricsUncheckedUpdateManyWithoutTopicsNestedInput
  }

  export type topicsUncheckedUpdateManyWithoutClassesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type chat_sessionsCreateManyTopicsInput = {
    session_id: string
    class_code: string
    user_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
  }

  export type daily_topic_metricsCreateManyTopicsInput = {
    user_id: string
    class_code: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type chat_sessionsUpdateWithoutTopicsInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUpdateManyWithoutChat_sessionsNestedInput
    classes?: classesUpdateOneRequiredWithoutChat_sessionsNestedInput
    users?: UserUpdateOneRequiredWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateWithoutTopicsInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUncheckedUpdateManyWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateManyWithoutTopicsInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type daily_topic_metricsUpdateWithoutTopicsInput = {
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    classes?: classesUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
    users?: UserUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
  }

  export type daily_topic_metricsUncheckedUpdateWithoutTopicsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUncheckedUpdateManyWithoutTopicsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type AccountCreateManyUserInput = {
    provider: string
    providerAccountId: string
    access_token?: string | null
    refresh_token?: string | null
    expires_at?: bigint | number | null
    type?: string | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    refresh_token_expires_in?: number | null
    updatedat?: Date | string | null
  }

  export type chat_sessionsCreateManyUsersInput = {
    session_id: string
    class_code: string
    topic_id: string
    started_at?: Date | string | null
    created_at?: Date | string | null
  }

  export type daily_topic_metricsCreateManyUsersInput = {
    class_code: string
    topic_id: string
    metric_date: Date | string
    avg_score?: Decimal | DecimalJsLike | number | string | null
  }

  export type friend_requestsCreateManyUsers_friend_requests_receiver_idTousersInput = {
    id: string
    sender_id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
  }

  export type friend_requestsCreateManyUsers_friend_requests_sender_idTousersInput = {
    id: string
    receiver_id: string
    status: string
    created_at?: Date | string | null
    responded_at?: Date | string | null
  }

  export type friendsCreateManyUsers_friends_friend_idTousersInput = {
    user_id: string
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
  }

  export type friendsCreateManyUsers_friends_user_idTousersInput = {
    friend_id: string
    created_at?: Date | string | null
    streak?: number | null
    total_xp?: number | null
  }

  export type user_achievementsCreateManyUsersInput = {
    achievement_id: string
    earned_at?: Date | string | null
  }

  export type xp_systemCreateManyUsersInput = {
    id: string
    source: string
    amount: number
    created_at?: Date | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chat_sessionsUpdateWithoutUsersInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUpdateManyWithoutChat_sessionsNestedInput
    classes?: classesUpdateOneRequiredWithoutChat_sessionsNestedInput
    topics?: topicsUpdateOneRequiredWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateWithoutUsersInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat_history?: chat_historyUncheckedUpdateManyWithoutChat_sessionsNestedInput
  }

  export type chat_sessionsUncheckedUpdateManyWithoutUsersInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    class_code?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type daily_topic_metricsUpdateWithoutUsersInput = {
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    classes?: classesUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
    topics?: topicsUpdateOneRequiredWithoutDaily_topic_metricsNestedInput
  }

  export type daily_topic_metricsUncheckedUpdateWithoutUsersInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type daily_topic_metricsUncheckedUpdateManyWithoutUsersInput = {
    class_code?: StringFieldUpdateOperationsInput | string
    topic_id?: StringFieldUpdateOperationsInput | string
    metric_date?: DateTimeFieldUpdateOperationsInput | Date | string
    avg_score?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type friend_requestsUpdateWithoutUsers_friend_requests_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_friend_requests_sender_idTousers?: UserUpdateOneRequiredWithoutFriend_requests_friend_requests_sender_idTousersNestedInput
  }

  export type friend_requestsUncheckedUpdateWithoutUsers_friend_requests_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_receiver_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friend_requestsUpdateWithoutUsers_friend_requests_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_friend_requests_receiver_idTousers?: UserUpdateOneRequiredWithoutFriend_requests_friend_requests_receiver_idTousersNestedInput
  }

  export type friend_requestsUncheckedUpdateWithoutUsers_friend_requests_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiver_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friend_requestsUncheckedUpdateManyWithoutUsers_friend_requests_sender_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiver_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type friendsUpdateWithoutUsers_friends_friend_idTousersInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    users_friends_user_idTousers?: UserUpdateOneRequiredWithoutFriends_friends_user_idTousersNestedInput
  }

  export type friendsUncheckedUpdateWithoutUsers_friends_friend_idTousersInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type friendsUncheckedUpdateManyWithoutUsers_friends_friend_idTousersInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type friendsUpdateWithoutUsers_friends_user_idTousersInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
    users_friends_friend_idTousers?: UserUpdateOneRequiredWithoutFriends_friends_friend_idTousersNestedInput
  }

  export type friendsUncheckedUpdateWithoutUsers_friends_user_idTousersInput = {
    friend_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type friendsUncheckedUpdateManyWithoutUsers_friends_user_idTousersInput = {
    friend_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: NullableIntFieldUpdateOperationsInput | number | null
    total_xp?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type user_achievementsUpdateWithoutUsersInput = {
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    achievements?: achievementsUpdateOneRequiredWithoutUser_achievementsNestedInput
  }

  export type user_achievementsUncheckedUpdateWithoutUsersInput = {
    achievement_id?: StringFieldUpdateOperationsInput | string
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_achievementsUncheckedUpdateManyWithoutUsersInput = {
    achievement_id?: StringFieldUpdateOperationsInput | string
    earned_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type xp_systemUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type xp_systemUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type xp_systemUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}