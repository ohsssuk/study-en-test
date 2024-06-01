export interface ResultType<T> {
  status: boolean;
  code: number;
  data: T | null;
}

export async function fetchData<T>(url: string): Promise<ResultType<T>> {
  try {
    const res = await fetch(url);
    const data: T = await res.json();

    return {
      status: true,
      code: 200,
      data: { ...data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: false,
      code: 404,
      data: null,
    };
  }
}
