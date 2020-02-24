import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  Upload: any,
};

export type Board = {
   __typename?: 'Board',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Color = {
   __typename?: 'Color',
  description?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  name: Scalars['String'],
  tasks?: Maybe<Array<Task>>,
  value: ColorValues,
};

export enum ColorValues {
  Blue = 'BLUE',
  Brown = 'BROWN',
  Cyan = 'CYAN',
  Green = 'GREEN',
  Magenta = 'MAGENTA',
  Orange = 'ORANGE',
  Purple = 'PURPLE',
  Red = 'RED',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type Comment = {
   __typename?: 'Comment',
  author: User,
  createdTimestamp: Scalars['DateTime'],
  id: Scalars['ID'],
  task: Task,
  text: Scalars['String'],
};

export enum Countries {
  Afghanistan = 'Afghanistan',
  AlandIslands = 'AlandIslands',
  Albania = 'Albania',
  Algeria = 'Algeria',
  AmericanSamoa = 'AmericanSamoa',
  Andorra = 'Andorra',
  Angola = 'Angola',
  Anguilla = 'Anguilla',
  Antarctica = 'Antarctica',
  AntiguaAndBarbuda = 'AntiguaAndBarbuda',
  Argentina = 'Argentina',
  Armenia = 'Armenia',
  Aruba = 'Aruba',
  Australia = 'Australia',
  Austria = 'Austria',
  Azerbaijan = 'Azerbaijan',
  Bahamas = 'Bahamas',
  Bahrain = 'Bahrain',
  Bangladesh = 'Bangladesh',
  Barbados = 'Barbados',
  Belarus = 'Belarus',
  Belgium = 'Belgium',
  Belize = 'Belize',
  Benin = 'Benin',
  Bermuda = 'Bermuda',
  Bhutan = 'Bhutan',
  Bolivia = 'Bolivia',
  BosniaAndHerzegovina = 'BosniaAndHerzegovina',
  Botswana = 'Botswana',
  BouvetIsland = 'BouvetIsland',
  Brazil = 'Brazil',
  BritishIndianOceanTerritory = 'BritishIndianOceanTerritory',
  BruneiDarussalam = 'BruneiDarussalam',
  Bulgaria = 'Bulgaria',
  BurkinaFaso = 'BurkinaFaso',
  Burundi = 'Burundi',
  Cambodia = 'Cambodia',
  Cameroon = 'Cameroon',
  Canada = 'Canada',
  CapeVerde = 'CapeVerde',
  CaymanIslands = 'CaymanIslands',
  CentralAfricanRepublic = 'CentralAfricanRepublic',
  Chad = 'Chad',
  Chile = 'Chile',
  China = 'China',
  ChristmasIsland = 'ChristmasIsland',
  CocosKeelingIslands = 'CocosKeelingIslands',
  Colombia = 'Colombia',
  Comoros = 'Comoros',
  Congo = 'Congo',
  CongoDemocraticRepublic = 'CongoDemocraticRepublic',
  CookIslands = 'CookIslands',
  CostaRica = 'CostaRica',
  CoteDIvoire = 'CoteDIvoire',
  Croatia = 'Croatia',
  Cuba = 'Cuba',
  Cyprus = 'Cyprus',
  CzechRepublic = 'CzechRepublic',
  Denmark = 'Denmark',
  Djibouti = 'Djibouti',
  Dominica = 'Dominica',
  DominicanRepublic = 'DominicanRepublic',
  Ecuador = 'Ecuador',
  Egypt = 'Egypt',
  ElSalvador = 'ElSalvador',
  EquatorialGuinea = 'EquatorialGuinea',
  Eritrea = 'Eritrea',
  Estonia = 'Estonia',
  Ethiopia = 'Ethiopia',
  FalklandIslands = 'FalklandIslands',
  FaroeIslands = 'FaroeIslands',
  Fiji = 'Fiji',
  Finland = 'Finland',
  France = 'France',
  FrenchGuiana = 'FrenchGuiana',
  FrenchPolynesia = 'FrenchPolynesia',
  FrenchSouthernTerritories = 'FrenchSouthernTerritories',
  Gabon = 'Gabon',
  Gambia = 'Gambia',
  Georgia = 'Georgia',
  Germany = 'Germany',
  Ghana = 'Ghana',
  Gibraltar = 'Gibraltar',
  Greece = 'Greece',
  Greenland = 'Greenland',
  Grenada = 'Grenada',
  Guadeloupe = 'Guadeloupe',
  Guam = 'Guam',
  Guatemala = 'Guatemala',
  Guernsey = 'Guernsey',
  Guinea = 'Guinea',
  GuineaBissau = 'GuineaBissau',
  Guyana = 'Guyana',
  Haiti = 'Haiti',
  HeardIslandMcdonaldIslands = 'HeardIslandMcdonaldIslands',
  HolySeeVaticanCityState = 'HolySeeVaticanCityState',
  Honduras = 'Honduras',
  HongKong = 'HongKong',
  Hungary = 'Hungary',
  Iceland = 'Iceland',
  India = 'India',
  Indonesia = 'Indonesia',
  Iran = 'Iran',
  Iraq = 'Iraq',
  Ireland = 'Ireland',
  IsleOfMan = 'IsleOfMan',
  Israel = 'Israel',
  Italy = 'Italy',
  Jamaica = 'Jamaica',
  Japan = 'Japan',
  Jersey = 'Jersey',
  Jordan = 'Jordan',
  Kazakhstan = 'Kazakhstan',
  Kenya = 'Kenya',
  Kiribati = 'Kiribati',
  Korea = 'Korea',
  Kuwait = 'Kuwait',
  Kyrgyzstan = 'Kyrgyzstan',
  LaoPeoplesDemocraticRepublic = 'LaoPeoplesDemocraticRepublic',
  Latvia = 'Latvia',
  Lebanon = 'Lebanon',
  Lesotho = 'Lesotho',
  Liberia = 'Liberia',
  LibyanArabJamahiriya = 'LibyanArabJamahiriya',
  Liechtenstein = 'Liechtenstein',
  Lithuania = 'Lithuania',
  Luxembourg = 'Luxembourg',
  Macao = 'Macao',
  Macedonia = 'Macedonia',
  Madagascar = 'Madagascar',
  Malawi = 'Malawi',
  Malaysia = 'Malaysia',
  Maldives = 'Maldives',
  Mali = 'Mali',
  Malta = 'Malta',
  MarshallIslands = 'MarshallIslands',
  Martinique = 'Martinique',
  Mauritania = 'Mauritania',
  Mauritius = 'Mauritius',
  Mayotte = 'Mayotte',
  Mexico = 'Mexico',
  Micronesia = 'Micronesia',
  Moldova = 'Moldova',
  Monaco = 'Monaco',
  Mongolia = 'Mongolia',
  Montenegro = 'Montenegro',
  Montserrat = 'Montserrat',
  Morocco = 'Morocco',
  Mozambique = 'Mozambique',
  Myanmar = 'Myanmar',
  Namibia = 'Namibia',
  Nauru = 'Nauru',
  Nepal = 'Nepal',
  Netherlands = 'Netherlands',
  NetherlandsAntilles = 'NetherlandsAntilles',
  NewCaledonia = 'NewCaledonia',
  NewZealand = 'NewZealand',
  Nicaragua = 'Nicaragua',
  Niger = 'Niger',
  Nigeria = 'Nigeria',
  Niue = 'Niue',
  NorfolkIsland = 'NorfolkIsland',
  NorthernMarianaIslands = 'NorthernMarianaIslands',
  Norway = 'Norway',
  Oman = 'Oman',
  Pakistan = 'Pakistan',
  Palau = 'Palau',
  PalestinianTerritory = 'PalestinianTerritory',
  Panama = 'Panama',
  PapuaNewGuinea = 'PapuaNewGuinea',
  Paraguay = 'Paraguay',
  Peru = 'Peru',
  Philippines = 'Philippines',
  Pitcairn = 'Pitcairn',
  Poland = 'Poland',
  Portugal = 'Portugal',
  PuertoRico = 'PuertoRico',
  Qatar = 'Qatar',
  Reunion = 'Reunion',
  Romania = 'Romania',
  RussianFederation = 'RussianFederation',
  Rwanda = 'Rwanda',
  SaintBarthelemy = 'SaintBarthelemy',
  SaintHelena = 'SaintHelena',
  SaintKittsAndNevis = 'SaintKittsAndNevis',
  SaintLucia = 'SaintLucia',
  SaintMartin = 'SaintMartin',
  SaintPierreAndMiquelon = 'SaintPierreAndMiquelon',
  SaintVincentAndGrenadines = 'SaintVincentAndGrenadines',
  Samoa = 'Samoa',
  SanMarino = 'SanMarino',
  SaoTomeAndPrincipe = 'SaoTomeAndPrincipe',
  SaudiArabia = 'SaudiArabia',
  Senegal = 'Senegal',
  Serbia = 'Serbia',
  Seychelles = 'Seychelles',
  SierraLeone = 'SierraLeone',
  Singapore = 'Singapore',
  Slovakia = 'Slovakia',
  Slovenia = 'Slovenia',
  SolomonIslands = 'SolomonIslands',
  Somalia = 'Somalia',
  SouthAfrica = 'SouthAfrica',
  SouthGeorgiaAndSandwichIsl = 'SouthGeorgiaAndSandwichIsl',
  Spain = 'Spain',
  SriLanka = 'SriLanka',
  Sudan = 'Sudan',
  Suriname = 'Suriname',
  SvalbardAndJanMayen = 'SvalbardAndJanMayen',
  Swaziland = 'Swaziland',
  Sweden = 'Sweden',
  Switzerland = 'Switzerland',
  SyrianArabRepublic = 'SyrianArabRepublic',
  Taiwan = 'Taiwan',
  Tajikistan = 'Tajikistan',
  Tanzania = 'Tanzania',
  Thailand = 'Thailand',
  TimorLeste = 'TimorLeste',
  Togo = 'Togo',
  Tokelau = 'Tokelau',
  Tonga = 'Tonga',
  TrinidadAndTobago = 'TrinidadAndTobago',
  Tunisia = 'Tunisia',
  Turkey = 'Turkey',
  Turkmenistan = 'Turkmenistan',
  TurksAndCaicosIslands = 'TurksAndCaicosIslands',
  Tuvalu = 'Tuvalu',
  Uganda = 'Uganda',
  Ukraine = 'Ukraine',
  UnitedArabEmirates = 'UnitedArabEmirates',
  UnitedKingdom = 'UnitedKingdom',
  UnitedStates = 'UnitedStates',
  UnitedStatesOutlyingIslands = 'UnitedStatesOutlyingIslands',
  Uruguay = 'Uruguay',
  Uzbekistan = 'Uzbekistan',
  Vanuatu = 'Vanuatu',
  Venezuela = 'Venezuela',
  VietNam = 'VietNam',
  VirginIslandsBritish = 'VirginIslandsBritish',
  VirginIslandsUs = 'VirginIslandsUS',
  WallisAndFutuna = 'WallisAndFutuna',
  WesternSahara = 'WesternSahara',
  Yemen = 'Yemen',
  Zambia = 'Zambia',
  Zimbabw = 'Zimbabw'
}

export type Data = {
   __typename?: 'Data',
  field: Scalars['String'],
  fieldCap: Scalars['String'],
};


export type DataFieldCapArgs = {
  arg: Scalars['String'],
  arg2: Scalars['String']
};


export type File = {
   __typename?: 'File',
  filename: Scalars['String'],
  mimetype: Scalars['String'],
  encoding: Scalars['String'],
};

export type Label = {
   __typename?: 'Label',
  id: Scalars['ID'],
  name: Scalars['String'],
  pinned: Scalars['Boolean'],
  tasks: Array<Task>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createTask: Task,
  generateMockUsers: Array<UserNew>,
  login: UserNew,
  register: Scalars['Boolean'],
  singleUpload: File,
  userCreate: UserNew,
  userModify: UserNew,
};


export type MutationGenerateMockUsersArgs = {
  amount: Scalars['Float']
};


export type MutationLoginArgs = {
  credentials: UserLoginInput
};


export type MutationRegisterArgs = {
  userData: UserCreateInput
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload']
};


export type MutationUserCreateArgs = {
  userData: UserCreateInput
};


export type MutationUserModifyArgs = {
  changes: UserModifyInput,
  userId: Scalars['String']
};

export type PaginatedUserResponse = {
   __typename?: 'PaginatedUserResponse',
  hasMore: Scalars['Boolean'],
  items: Array<UserNew>,
  total: Scalars['Int'],
};

export type Query = {
   __typename?: 'Query',
  data?: Maybe<Data>,
  errorToIgnore: Scalars['String'],
  files?: Maybe<Array<Maybe<File>>>,
  getCatFact: Scalars['String'],
  hello: Scalars['String'],
  tasks: Array<Task>,
  uploads?: Maybe<Array<Maybe<File>>>,
  users: Array<UserNew>,
  usersPaginated: PaginatedUserResponse,
};


export type QueryUsersArgs = {
  searchBy?: Maybe<UserSearchInput>
};


export type QueryUsersPaginatedArgs = {
  startAt?: Maybe<Scalars['Float']>,
  upTo?: Maybe<Scalars['Float']>
};

export type Subtask = {
   __typename?: 'Subtask',
  dueDateTimestamp?: Maybe<Scalars['DateTime']>,
  dueDateTimestampLocal?: Maybe<Scalars['DateTime']>,
  finished: Scalars['Boolean'],
  id: Scalars['ID'],
  name: Scalars['String'],
  parent: Task,
  user?: Maybe<Array<User>>,
};

export type Swimlane = {
   __typename?: 'Swimlane',
  board: Board,
  id: Scalars['ID'],
  tasks: Array<Task>,
};

export type Task = {
   __typename?: 'Task',
  collaborators: Array<User>,
  color: Color,
  column: TColumn,
  comments?: Maybe<Comment>,
  createdAt: Scalars['DateTime'],
  dates?: Maybe<Array<TDate>>,
  description: Scalars['String'],
  id: Scalars['ID'],
  labels: Array<Label>,
  name: Scalars['String'],
  number?: Maybe<TaskNumber>,
  pointsEstimate?: Maybe<Scalars['Float']>,
  position: Scalars['Float'],
  responsibleUser?: Maybe<User>,
  subtasks?: Maybe<Array<Subtask>>,
  swimlane: Swimlane,
  totalSecondsEstimate?: Maybe<Scalars['Float']>,
  totalSecondsSpent: Scalars['Float'],
  updatedAt: Scalars['DateTime'],
};

export type TaskNumber = {
   __typename?: 'TaskNumber',
  id: Scalars['ID'],
  prefix: Scalars['String'],
  value: Scalars['Float'],
};

export type TColumn = {
   __typename?: 'TColumn',
  board: Board,
  id: Scalars['ID'],
  tasks?: Maybe<Array<Task>>,
};

export type TDate = {
   __typename?: 'TDate',
  dateType: Scalars['String'],
  dueTimestamp?: Maybe<Scalars['DateTime']>,
  dueTimestampLocal?: Maybe<Scalars['DateTime']>,
  id: Scalars['ID'],
  status: Scalars['String'],
  targetColumn: TColumn,
  tasks?: Maybe<Array<Task>>,
};


export type User = {
   __typename?: 'User',
  collaboratingAt: Array<Task>,
  comments: Array<Comment>,
  id: Scalars['ID'],
  subtasks: Array<Subtask>,
  tasks: Array<Task>,
};

export type UserCreateInput = {
  age: Scalars['Int'],
  country: Countries,
  email: Scalars['String'],
  firstName: Scalars['String'],
  friendsIds?: Maybe<Array<Scalars['String']>>,
  lastName?: Maybe<Scalars['String']>,
  password: Scalars['String'],
};

export type UserLoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UserModifyInput = {
  age?: Maybe<Scalars['Int']>,
  country?: Maybe<Countries>,
  email?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  friendsIds?: Maybe<Array<Scalars['String']>>,
  lastName?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type UserNew = {
   __typename?: 'UserNew',
  age: Scalars['Int'],
  country: Countries,
  createdDate: Scalars['DateTime'],
  deprecated: Scalars['String'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  friends: Array<UserNew>,
  howCommonIsName: Scalars['String'],
  /** 
 * Unique user ID.
   * This field suppports **formatting** and [links](https://google.com).
 */
  id: Scalars['ID'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  password: Scalars['String'],
  updatedDate: Scalars['DateTime'],
};

export type UserSearchInput = {
  age?: Maybe<Scalars['Int']>,
  country?: Maybe<Countries>,
  email?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Data: ResolverTypeWrapper<Data>,
  String: ResolverTypeWrapper<Scalars['String']>,
  File: ResolverTypeWrapper<File>,
  Task: ResolverTypeWrapper<Task>,
  User: ResolverTypeWrapper<User>,
  Comment: ResolverTypeWrapper<Comment>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Subtask: ResolverTypeWrapper<Subtask>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Color: ResolverTypeWrapper<Color>,
  ColorValues: ColorValues,
  TColumn: ResolverTypeWrapper<TColumn>,
  Board: ResolverTypeWrapper<Board>,
  TDate: ResolverTypeWrapper<TDate>,
  Label: ResolverTypeWrapper<Label>,
  TaskNumber: ResolverTypeWrapper<TaskNumber>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Swimlane: ResolverTypeWrapper<Swimlane>,
  UserSearchInput: UserSearchInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Countries: Countries,
  UserNew: ResolverTypeWrapper<UserNew>,
  PaginatedUserResponse: ResolverTypeWrapper<PaginatedUserResponse>,
  Mutation: ResolverTypeWrapper<{}>,
  UserLoginInput: UserLoginInput,
  UserCreateInput: UserCreateInput,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  UserModifyInput: UserModifyInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Data: Data,
  String: Scalars['String'],
  File: File,
  Task: Task,
  User: User,
  Comment: Comment,
  DateTime: Scalars['DateTime'],
  ID: Scalars['ID'],
  Subtask: Subtask,
  Boolean: Scalars['Boolean'],
  Color: Color,
  ColorValues: ColorValues,
  TColumn: TColumn,
  Board: Board,
  TDate: TDate,
  Label: Label,
  TaskNumber: TaskNumber,
  Float: Scalars['Float'],
  Swimlane: Swimlane,
  UserSearchInput: UserSearchInput,
  Int: Scalars['Int'],
  Countries: Countries,
  UserNew: UserNew,
  PaginatedUserResponse: PaginatedUserResponse,
  Mutation: {},
  UserLoginInput: UserLoginInput,
  UserCreateInput: UserCreateInput,
  Upload: Scalars['Upload'],
  UserModifyInput: UserModifyInput,
};

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Color'] = ResolversParentTypes['Color']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>,
  value?: Resolver<ResolversTypes['ColorValues'], ParentType, ContextType>,
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  createdTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type DataResolvers<ContextType = any, ParentType extends ResolversParentTypes['Data'] = ResolversParentTypes['Data']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fieldCap?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<DataFieldCapArgs, 'arg' | 'arg2'>>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type LabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pinned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType>,
  generateMockUsers?: Resolver<Array<ResolversTypes['UserNew']>, ParentType, ContextType, RequireFields<MutationGenerateMockUsersArgs, 'amount'>>,
  login?: Resolver<ResolversTypes['UserNew'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>,
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'userData'>>,
  singleUpload?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationSingleUploadArgs, 'file'>>,
  userCreate?: Resolver<ResolversTypes['UserNew'], ParentType, ContextType, RequireFields<MutationUserCreateArgs, 'userData'>>,
  userModify?: Resolver<ResolversTypes['UserNew'], ParentType, ContextType, RequireFields<MutationUserModifyArgs, 'changes' | 'userId'>>,
};

export type PaginatedUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedUserResponse'] = ResolversParentTypes['PaginatedUserResponse']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['UserNew']>, ParentType, ContextType>,
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  data?: Resolver<Maybe<ResolversTypes['Data']>, ParentType, ContextType>,
  errorToIgnore?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['File']>>>, ParentType, ContextType>,
  getCatFact?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  uploads?: Resolver<Maybe<Array<Maybe<ResolversTypes['File']>>>, ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['UserNew']>, ParentType, ContextType, QueryUsersArgs>,
  usersPaginated?: Resolver<ResolversTypes['PaginatedUserResponse'], ParentType, ContextType, QueryUsersPaginatedArgs>,
};

export type SubtaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subtask'] = ResolversParentTypes['Subtask']> = {
  dueDateTimestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  dueDateTimestampLocal?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  finished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  parent?: Resolver<ResolversTypes['Task'], ParentType, ContextType>,
  user?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>,
};

export type SwimlaneResolvers<ContextType = any, ParentType extends ResolversParentTypes['Swimlane'] = ResolversParentTypes['Swimlane']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  collaborators?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  color?: Resolver<ResolversTypes['Color'], ParentType, ContextType>,
  column?: Resolver<ResolversTypes['TColumn'], ParentType, ContextType>,
  comments?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  dates?: Resolver<Maybe<Array<ResolversTypes['TDate']>>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  number?: Resolver<Maybe<ResolversTypes['TaskNumber']>, ParentType, ContextType>,
  pointsEstimate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  position?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  responsibleUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  subtasks?: Resolver<Maybe<Array<ResolversTypes['Subtask']>>, ParentType, ContextType>,
  swimlane?: Resolver<ResolversTypes['Swimlane'], ParentType, ContextType>,
  totalSecondsEstimate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  totalSecondsSpent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type TaskNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskNumber'] = ResolversParentTypes['TaskNumber']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  prefix?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type TColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['TColumn'] = ResolversParentTypes['TColumn']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>,
};

export type TDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TDate'] = ResolversParentTypes['TDate']> = {
  dateType?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  dueTimestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  dueTimestampLocal?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  targetColumn?: Resolver<ResolversTypes['TColumn'], ParentType, ContextType>,
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  collaboratingAt?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  subtasks?: Resolver<Array<ResolversTypes['Subtask']>, ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
};

export type UserNewResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNew'] = ResolversParentTypes['UserNew']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  country?: Resolver<ResolversTypes['Countries'], ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deprecated?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  friends?: Resolver<Array<ResolversTypes['UserNew']>, ParentType, ContextType>,
  howCommonIsName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Board?: BoardResolvers<ContextType>,
  Color?: ColorResolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  Data?: DataResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  File?: FileResolvers<ContextType>,
  Label?: LabelResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PaginatedUserResponse?: PaginatedUserResponseResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subtask?: SubtaskResolvers<ContextType>,
  Swimlane?: SwimlaneResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  TaskNumber?: TaskNumberResolvers<ContextType>,
  TColumn?: TColumnResolvers<ContextType>,
  TDate?: TDateResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
  UserNew?: UserNewResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

import gql from 'graphql-tag';
