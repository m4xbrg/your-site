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
"mathematics/calculus/limits/computation-strategies.mdx": {
	id: "mathematics/calculus/limits/computation-strategies.mdx";
  slug: "mathematics/calculus/limits/computation-strategies";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/continuity-interval.mdx": {
	id: "mathematics/calculus/limits/continuity-interval.mdx";
  slug: "mathematics/calculus/limits/continuity-interval";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/continuity-point.mdx": {
	id: "mathematics/calculus/limits/continuity-point.mdx";
  slug: "mathematics/calculus/limits/continuity-point";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/discontinuities-classification.mdx": {
	id: "mathematics/calculus/limits/discontinuities-classification.mdx";
  slug: "mathematics/calculus/limits/discontinuities-classification";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/epsilon-delta-definition.mdx": {
	id: "mathematics/calculus/limits/epsilon-delta-definition.mdx";
  slug: "mathematics/calculus/limits/epsilon-delta-definition";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/epsilon-delta-proofs.mdx": {
	id: "mathematics/calculus/limits/epsilon-delta-proofs.mdx";
  slug: "mathematics/calculus/limits/epsilon-delta-proofs";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/graphical-numerical.mdx": {
	id: "mathematics/calculus/limits/graphical-numerical.mdx";
  slug: "mathematics/calculus/limits/graphical-numerical";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/infinite-limits.mdx": {
	id: "mathematics/calculus/limits/infinite-limits.mdx";
  slug: "mathematics/calculus/limits/infinite-limits";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/informal-idea.mdx": {
	id: "mathematics/calculus/limits/informal-idea.mdx";
  slug: "mathematics/calculus/limits/informal-idea";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/ivt.mdx": {
	id: "mathematics/calculus/limits/ivt.mdx";
  slug: "mathematics/calculus/limits/ivt";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/limit-laws.mdx": {
	id: "mathematics/calculus/limits/limit-laws.mdx";
  slug: "mathematics/calculus/limits/limit-laws";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/limits-at-infinity.mdx": {
	id: "mathematics/calculus/limits/limits-at-infinity.mdx";
  slug: "mathematics/calculus/limits/limits-at-infinity";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/notation.mdx": {
	id: "mathematics/calculus/limits/notation.mdx";
  slug: "mathematics/calculus/limits/notation";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/one-sided.mdx": {
	id: "mathematics/calculus/limits/one-sided.mdx";
  slug: "mathematics/calculus/limits/one-sided";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/removable-discontinuities.mdx": {
	id: "mathematics/calculus/limits/removable-discontinuities.mdx";
  slug: "mathematics/calculus/limits/removable-discontinuities";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/squeeze-theorem.mdx": {
	id: "mathematics/calculus/limits/squeeze-theorem.mdx";
  slug: "mathematics/calculus/limits/squeeze-theorem";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/foundations/arithmetic-algebra.mdx": {
	id: "mathematics/foundations/arithmetic-algebra.mdx";
  slug: "mathematics/foundations/arithmetic-algebra";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/foundations/functions-basic.mdx": {
	id: "mathematics/foundations/functions-basic.mdx";
  slug: "mathematics/foundations/functions-basic";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
"mathematics/foundations/logic-quantifiers.mdx": {
	id: "mathematics/foundations/logic-quantifiers.mdx";
  slug: "mathematics/foundations/logic-quantifiers";
  body: string;
  collection: "concepts";
  data: InferEntrySchema<"concepts">
} & { render(): Render[".mdx"] };
};
"courses": {
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
"physics-em-electric-potential.md": {
	id: "physics-em-electric-potential.md";
  slug: "physics-em-electric-potential";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-em-electrostatics.md": {
	id: "physics-em-electrostatics.md";
  slug: "physics-em-electrostatics";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-em-magnetism.md": {
	id: "physics-em-magnetism.md";
  slug: "physics-em-magnetism";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-em-maxwell.md": {
	id: "physics-em-maxwell.md";
  slug: "physics-em-maxwell";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-foundations-modelling.md": {
	id: "physics-foundations-modelling.md";
  slug: "physics-foundations-modelling";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-foundations-quantities-units.md": {
	id: "physics-foundations-quantities-units.md";
  slug: "physics-foundations-quantities-units";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-foundations-symmetries.md": {
	id: "physics-foundations-symmetries.md";
  slug: "physics-foundations-symmetries";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-foundations-vectors-geometry.md": {
	id: "physics-foundations-vectors-geometry.md";
  slug: "physics-foundations-vectors-geometry";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-mechanics-energy-momentum.md": {
	id: "physics-mechanics-energy-momentum.md";
  slug: "physics-mechanics-energy-momentum";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-mechanics-kinematics.md": {
	id: "physics-mechanics-kinematics.md";
  slug: "physics-mechanics-kinematics";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-mechanics-lagrangian.md": {
	id: "physics-mechanics-lagrangian.md";
  slug: "physics-mechanics-lagrangian";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-mechanics-newtonian.md": {
	id: "physics-mechanics-newtonian.md";
  slug: "physics-mechanics-newtonian";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-mechanics-oscillations.md": {
	id: "physics-mechanics-oscillations.md";
  slug: "physics-mechanics-oscillations";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-mechanics-rotation.md": {
	id: "physics-mechanics-rotation.md";
  slug: "physics-mechanics-rotation";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-modern-atomic.md": {
	id: "physics-modern-atomic.md";
  slug: "physics-modern-atomic";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-modern-quantum-origins.md": {
	id: "physics-modern-quantum-origins.md";
  slug: "physics-modern-quantum-origins";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-modern-relativity.md": {
	id: "physics-modern-relativity.md";
  slug: "physics-modern-relativity";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-optics-geometric.md": {
	id: "physics-optics-geometric.md";
  slug: "physics-optics-geometric";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-optics-polarization.md": {
	id: "physics-optics-polarization.md";
  slug: "physics-optics-polarization";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-optics-wave.md": {
	id: "physics-optics-wave.md";
  slug: "physics-optics-wave";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-quantum-angular-momentum.md": {
	id: "physics-quantum-angular-momentum.md";
  slug: "physics-quantum-angular-momentum";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-quantum-measurement.md": {
	id: "physics-quantum-measurement.md";
  slug: "physics-quantum-measurement";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-quantum-operators.md": {
	id: "physics-quantum-operators.md";
  slug: "physics-quantum-operators";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-quantum-schrodinger.md": {
	id: "physics-quantum-schrodinger.md";
  slug: "physics-quantum-schrodinger";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-quantum-states.md": {
	id: "physics-quantum-states.md";
  slug: "physics-quantum-states";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-relativity-gravity.md": {
	id: "physics-relativity-gravity.md";
  slug: "physics-relativity-gravity";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-relativity-special.md": {
	id: "physics-relativity-special.md";
  slug: "physics-relativity-special";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-relativity-tensors.md": {
	id: "physics-relativity-tensors.md";
  slug: "physics-relativity-tensors";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-thermo-entropy.md": {
	id: "physics-thermo-entropy.md";
  slug: "physics-thermo-entropy";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-thermo-laws.md": {
	id: "physics-thermo-laws.md";
  slug: "physics-thermo-laws";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-thermo-statistical.md": {
	id: "physics-thermo-statistical.md";
  slug: "physics-thermo-statistical";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-thermo-variables.md": {
	id: "physics-thermo-variables.md";
  slug: "physics-thermo-variables";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-waves-fourier.md": {
	id: "physics-waves-fourier.md";
  slug: "physics-waves-fourier";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-waves-interference.md": {
	id: "physics-waves-interference.md";
  slug: "physics-waves-interference";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-waves-shm.md": {
	id: "physics-waves-shm.md";
  slug: "physics-waves-shm";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"physics-waves-wave-equation.md": {
	id: "physics-waves-wave-equation.md";
  slug: "physics-waves-wave-equation";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
};
"exercises": {
"mathematics/calculus/limits/lesson-01-exercises.mdx": {
	id: "mathematics/calculus/limits/lesson-01-exercises.mdx";
  slug: "mathematics/calculus/limits/lesson-01-exercises";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-02-exercises.mdx": {
	id: "mathematics/calculus/limits/lesson-02-exercises.mdx";
  slug: "mathematics/calculus/limits/lesson-02-exercises";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-03-exercises.mdx": {
	id: "mathematics/calculus/limits/lesson-03-exercises.mdx";
  slug: "mathematics/calculus/limits/lesson-03-exercises";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-04-exercises.mdx": {
	id: "mathematics/calculus/limits/lesson-04-exercises.mdx";
  slug: "mathematics/calculus/limits/lesson-04-exercises";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-05-exercises.mdx": {
	id: "mathematics/calculus/limits/lesson-05-exercises.mdx";
  slug: "mathematics/calculus/limits/lesson-05-exercises";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-06-exercises.mdx": {
	id: "mathematics/calculus/limits/lesson-06-exercises.mdx";
  slug: "mathematics/calculus/limits/lesson-06-exercises";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/math-calculus-limits-review.mdx": {
	id: "mathematics/calculus/limits/math-calculus-limits-review.mdx";
  slug: "mathematics/calculus/limits/math-calculus-limits-review";
  body: string;
  collection: "exercises";
  data: InferEntrySchema<"exercises">
} & { render(): Render[".mdx"] };
};
"lessons": {
"mathematics/calculus/limits/lesson-01-introduction.mdx": {
	id: "mathematics/calculus/limits/lesson-01-introduction.mdx";
  slug: "mathematics/calculus/limits/lesson-01-introduction";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-02-limit-laws.mdx": {
	id: "mathematics/calculus/limits/lesson-02-limit-laws.mdx";
  slug: "mathematics/calculus/limits/lesson-02-limit-laws";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-03-asymptotic-behavior.mdx": {
	id: "mathematics/calculus/limits/lesson-03-asymptotic-behavior.mdx";
  slug: "mathematics/calculus/limits/lesson-03-asymptotic-behavior";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-04-continuity.mdx": {
	id: "mathematics/calculus/limits/lesson-04-continuity.mdx";
  slug: "mathematics/calculus/limits/lesson-04-continuity";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-05-epsilon-delta.mdx": {
	id: "mathematics/calculus/limits/lesson-05-epsilon-delta.mdx";
  slug: "mathematics/calculus/limits/lesson-05-epsilon-delta";
  body: string;
  collection: "lessons";
  data: InferEntrySchema<"lessons">
} & { render(): Render[".mdx"] };
"mathematics/calculus/limits/lesson-06-proof-theorems.mdx": {
	id: "mathematics/calculus/limits/lesson-06-proof-theorems.mdx";
  slug: "mathematics/calculus/limits/lesson-06-proof-theorems";
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
"physics-electricity-magnetism.md": {
	id: "physics-electricity-magnetism.md";
  slug: "physics-electricity-magnetism";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-foundations.md": {
	id: "physics-foundations.md";
  slug: "physics-foundations";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-mechanics.md": {
	id: "physics-mechanics.md";
  slug: "physics-mechanics";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-modern.md": {
	id: "physics-modern.md";
  slug: "physics-modern";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-optics.md": {
	id: "physics-optics.md";
  slug: "physics-optics";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-quantum.md": {
	id: "physics-quantum.md";
  slug: "physics-quantum";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-relativity.md": {
	id: "physics-relativity.md";
  slug: "physics-relativity";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-thermodynamics.md": {
	id: "physics-thermodynamics.md";
  slug: "physics-thermodynamics";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
"physics-waves.md": {
	id: "physics-waves.md";
  slug: "physics-waves";
  body: string;
  collection: "macro-courses";
  data: InferEntrySchema<"macro-courses">
} & { render(): Render[".md"] };
};
"notes": {
"math-authoring-guide.mdx": {
	id: "math-authoring-guide.mdx";
  slug: "math-authoring-guide";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".mdx"] };
};
"subjects": {
"mathematics.md": {
	id: "mathematics.md";
  slug: "mathematics";
  body: string;
  collection: "subjects";
  data: InferEntrySchema<"subjects">
} & { render(): Render[".md"] };
"physics.md": {
	id: "physics.md";
  slug: "physics";
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
