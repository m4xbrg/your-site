declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"concepts": {
"mathematics/limits.md": {
	id: "mathematics/limits.md";
  slug: "mathematics/limits";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".md"] };
"variables-and-types.md": {
	id: "variables-and-types.md";
  slug: "variables-and-types";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".md"] };
};
"courses": {
"cs-101.md": {
	id: "cs-101.md";
  slug: "cs-101";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-101.md": {
	id: "math-101.md";
  slug: "math-101";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-algebra-exponentials-logs.md": {
	id: "math-algebra-exponentials-logs.md";
  slug: "math-algebra-exponentials-logs";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-algebra-linear-equations.md": {
	id: "math-algebra-linear-equations.md";
  slug: "math-algebra-linear-equations";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-algebra-polynomials.md": {
	id: "math-algebra-polynomials.md";
  slug: "math-algebra-polynomials";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-analysis-continuity.md": {
	id: "math-analysis-continuity.md";
  slug: "math-analysis-continuity";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-analysis-differentiation.md": {
	id: "math-analysis-differentiation.md";
  slug: "math-analysis-differentiation";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-analysis-integration.md": {
	id: "math-analysis-integration.md";
  slug: "math-analysis-integration";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-analysis-sequences-limits.md": {
	id: "math-analysis-sequences-limits.md";
  slug: "math-analysis-sequences-limits";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-calculus-derivatives.md": {
	id: "math-calculus-derivatives.md";
  slug: "math-calculus-derivatives";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-calculus-integrals.md": {
	id: "math-calculus-integrals.md";
  slug: "math-calculus-integrals";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-calculus-limits.md": {
	id: "math-calculus-limits.md";
  slug: "math-calculus-limits";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-calculus-multiple-integrals.md": {
	id: "math-calculus-multiple-integrals.md";
  slug: "math-calculus-multiple-integrals";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-calculus-multivariable.md": {
	id: "math-calculus-multivariable.md";
  slug: "math-calculus-multivariable";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-calculus-sequences-series.md": {
	id: "math-calculus-sequences-series.md";
  slug: "math-calculus-sequences-series";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-discrete-combinatorics.md": {
	id: "math-discrete-combinatorics.md";
  slug: "math-discrete-combinatorics";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-discrete-graph-theory.md": {
	id: "math-discrete-graph-theory.md";
  slug: "math-discrete-graph-theory";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-discrete-number-theory.md": {
	id: "math-discrete-number-theory.md";
  slug: "math-discrete-number-theory";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-foundations-functions-graphs.md": {
	id: "math-foundations-functions-graphs.md";
  slug: "math-foundations-functions-graphs";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-foundations-number-systems.md": {
	id: "math-foundations-number-systems.md";
  slug: "math-foundations-number-systems";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-foundations-sets-logic-proof.md": {
	id: "math-foundations-sets-logic-proof.md";
  slug: "math-foundations-sets-logic-proof";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-geometry-analytic.md": {
	id: "math-geometry-analytic.md";
  slug: "math-geometry-analytic";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-geometry-euclidean.md": {
	id: "math-geometry-euclidean.md";
  slug: "math-geometry-euclidean";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-geometry-transformations-symmetry.md": {
	id: "math-geometry-transformations-symmetry.md";
  slug: "math-geometry-transformations-symmetry";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-la-eigen.md": {
	id: "math-la-eigen.md";
  slug: "math-la-eigen";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-la-inner-products.md": {
	id: "math-la-inner-products.md";
  slug: "math-la-inner-products";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-la-matrices-systems.md": {
	id: "math-la-matrices-systems.md";
  slug: "math-la-matrices-systems";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-la-vector-spaces.md": {
	id: "math-la-vector-spaces.md";
  slug: "math-la-vector-spaces";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-la-vectors.md": {
	id: "math-la-vectors.md";
  slug: "math-la-vectors";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-prob-conditional.md": {
	id: "math-prob-conditional.md";
  slug: "math-prob-conditional";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-prob-continuous.md": {
	id: "math-prob-continuous.md";
  slug: "math-prob-continuous";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-prob-discrete.md": {
	id: "math-prob-discrete.md";
  slug: "math-prob-discrete";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-prob-events-rv.md": {
	id: "math-prob-events-rv.md";
  slug: "math-prob-events-rv";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-stat-data-summaries.md": {
	id: "math-stat-data-summaries.md";
  slug: "math-stat-data-summaries";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-stat-estimation.md": {
	id: "math-stat-estimation.md";
  slug: "math-stat-estimation";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-stat-inference.md": {
	id: "math-stat-inference.md";
  slug: "math-stat-inference";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-stat-regression-modeling.md": {
	id: "math-stat-regression-modeling.md";
  slug: "math-stat-regression-modeling";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-trigonometry-equations-models.md": {
	id: "math-trigonometry-equations-models.md";
  slug: "math-trigonometry-equations-models";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-trigonometry-functions-identities.md": {
	id: "math-trigonometry-functions-identities.md";
  slug: "math-trigonometry-functions-identities";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"math-trigonometry-periodic-phenomena.md": {
	id: "math-trigonometry-periodic-phenomena.md";
  slug: "math-trigonometry-periodic-phenomena";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
};
"exercises": {
"example-exercise.md": {
	id: "example-exercise.md";
  slug: "example-exercise";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".md"] };
};
"lessons": {
"variables-and-types.mdx": {
	id: "variables-and-types.mdx";
  slug: "variables-and-types";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
};
"macro-courses": {
"math-algebra.md": {
	id: "math-algebra.md";
  slug: "math-algebra";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-analysis-real.md": {
	id: "math-analysis-real.md";
  slug: "math-analysis-real";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-calculus.md": {
	id: "math-calculus.md";
  slug: "math-calculus";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-discrete-math.md": {
	id: "math-discrete-math.md";
  slug: "math-discrete-math";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-foundations.md": {
	id: "math-foundations.md";
  slug: "math-foundations";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-geometry.md": {
	id: "math-geometry.md";
  slug: "math-geometry";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-linear-algebra.md": {
	id: "math-linear-algebra.md";
  slug: "math-linear-algebra";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-probability.md": {
	id: "math-probability.md";
  slug: "math-probability";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-statistics.md": {
	id: "math-statistics.md";
  slug: "math-statistics";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"math-trigonometry.md": {
	id: "math-trigonometry.md";
  slug: "math-trigonometry";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
};
"notes": {
"example-note.md": {
	id: "example-note.md";
  slug: "example-note";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
};
"subjects": {
"computer-science.md": {
	id: "computer-science.md";
  slug: "computer-science";
  body: string;
  collection: "subjects";
  data: InferEntrySchema<"subjects">
} & { render(): Render[".md"] };
};
"templates": {
"concept.mdx": {
	id: "concept.mdx";
  slug: "concept";
  body: string;
  collection: "templates";
  data: any
} & { render(): Render[".mdx"] };
"exercise.mdx": {
	id: "exercise.mdx";
  slug: "exercise";
  body: string;
  collection: "templates";
  data: any
} & { render(): Render[".mdx"] };
"lesson.mdx": {
	id: "lesson.mdx";
  slug: "lesson";
  body: string;
  collection: "templates";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		"glossary": {
"terms": {
	id: "terms";
  collection: "glossary";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
